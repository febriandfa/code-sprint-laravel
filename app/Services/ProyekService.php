<?php

namespace App\Services;

use App\Enums\ProyekStatus;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProyekService
{
    /**
     * Create a new class instance.
     */

    protected $proyekRepository;

    public function __construct(ProyekRepository $proyekRepository)
    {
        $this->proyekRepository = $proyekRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'kelas_id' => 'required|exists:kelases,id',
            'mapel_id' => 'required|exists:mapels,id',
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'tenggat' => 'required|date',
        ]);
    }

    public function create(Request $request)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->proyekRepository->create($validatedData);

            return redirect()->back()->with('success', 'Proyek berhasil ditambahkan');
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

            $this->proyekRepository->update($validatedData, $id);

            return redirect()->back()->with('success', 'Proyek berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->proyekRepository->delete($id);

            return redirect()->back()->with('success', 'Proyek berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
