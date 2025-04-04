<?php

namespace App\Services;

use App\Enums\ProyekAnswerStatus;
use App\Enums\ProyekStatus;
use App\Repositories\MateriRepository;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProyekService
{
    /**
     * Create a new class instance.
     */

    protected $proyekRepository;
    protected $materiRepository;

    public function __construct(ProyekRepository $proyekRepository, MateriRepository $materiRepository)
    {
        $this->proyekRepository = $proyekRepository;
        $this->materiRepository = $materiRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'materi_id' => 'required|exists:materis,id',
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
            $validatedData['created_at'] = now();
            $validatedData['updated_at'] = now();

            $proyekExistInMateri = $this->materiRepository->checkKuisOrProyek($validatedData['materi_id'], 'kuis');
            if ($proyekExistInMateri) {
                return redirect()->back()->with('warning', 'Materi ini sudah memiliki proyek');
            }

            $this->proyekRepository->create($validatedData);

            return redirect()->back()->with('success', 'Proyek berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            if ($request->refleksi) {
                $validator = Validator::make($request->all(), [
                    'refleksi' => 'required|string',
                ]);

                if ($validator->fails()) {
                    return redirect()->back()->withErrors($validator)->withInput();
                }

                $validatedData = $validator->validated();
                $this->proyekRepository->update($validatedData, $id);

                return redirect()->back()->with('success', 'Refleksi kelompok berhasil disimpan');
            } else {
                $validator = $this->validateInput($request->all());

                if ($validator->fails()) {
                    return redirect()->back()->withErrors($validator)->withInput();
                }
                $validatedData = $validator->validated();

                $this->proyekRepository->update($validatedData, $id);

                return to_route('guru.proyek.index')->with('success', 'Proyek berhasil diubah');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function refleksi(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'refleksi' => 'required|string',
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $validatedData = $validator->validated();

            $this->proyekRepository->update($validatedData, $id);

            return redirect()->back()->with('success', 'Refleksi kelompok berhasil disimpan');
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

    public function changeStatus(string $id, string $status)
    {
        try {
            $this->proyekRepository->update(['status' => $status], $id);

            return redirect()->back()->with('success', 'Proyek berhasil diubah statusnya');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
