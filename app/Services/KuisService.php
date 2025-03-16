<?php

namespace App\Services;

use App\Repositories\KuisRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KuisService
{
    /**
     * Create a new class instance.
     */

    protected $kuisRepository;

    public function __construct(KuisRepository $kuisRepository)
    {
        $this->kuisRepository = $kuisRepository;
    }


    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'materi_id' => 'required|exists:materis,id',
            'judul' => 'required|string',
            'durasi' => 'required|integer',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date'
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

            $this->kuisRepository->create($validatedData);

            return redirect()->back()->with('success', 'Kuis berhasil ditambahkan');
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

            $this->kuisRepository->update($validatedData, $id);

            return to_route('guru.kuis.index')->with('success', 'Kuis berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->kuisRepository->delete($id);

            return redirect()->back()->with('success', 'Kuis berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
