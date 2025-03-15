<?php

namespace App\Services;

use App\Repositories\KelasRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KelasService
{
    /**
     * Create a new class instance.
     */

    protected $kelasRepository;

    public function __construct(KelasRepository $kelasRepository)
    {
        $this->kelasRepository = $kelasRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'nama' => 'required|string',
            'guru_id' => 'required|exists:users,id'
        ]);
    }

    public function getAll()
    {
        return $this->kelasRepository->getAll();
    }

    public function create(Request $request)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->kelasRepository->create($validatedData);

            return redirect()->back()->with('success', 'Kelas berhasil ditambahkan');
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

            $this->kelasRepository->update($validatedData, $id);

            return to_route('admin.kelas.index')->with('success', 'Kelas berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->kelasRepository->delete($id);

            return redirect()->back()->with('success', 'Kelas berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
