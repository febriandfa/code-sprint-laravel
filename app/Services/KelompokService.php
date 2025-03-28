<?php

namespace App\Services;

use App\Repositories\KelompokRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KelompokService
{
    /**
     * Create a new class instance.
     */

    protected $kelompokRepository;

    public function __construct(KelompokRepository $kelompokRepository)
    {
        $this->kelompokRepository = $kelompokRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'nama' => 'required|string',
            'jumlah_anggota' => 'required|integer',
            'ketua_id' => 'required|exists:users,id',
            'masalah' => 'required|string',
        ]);
    }

    public function create(Request $request, string $proyekId)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();
            $validatedData['proyek_id'] = $proyekId;

            $this->kelompokRepository->create($validatedData);

            return redirect()->back()->with('success', 'Kelompok berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->kelompokRepository->update($validatedData, $id);

            return redirect()->back()->with('success', 'Kelompok berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->kelompokRepository->delete($id);

            return redirect()->back()->with('success', 'Kelompok berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
