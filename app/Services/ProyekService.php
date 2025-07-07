<?php

namespace App\Services;

use App\Enums\ProyekAnswerStatus;
use App\Enums\ProyekStatus;
use App\Repositories\MateriRepository;
use App\Repositories\ProyekPertemuanRepository;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProyekService
{
    /**
     * Create a new class instance.
     */

    protected $proyekRepository;
    protected $materiRepository;
    protected $proyekPertemuanRepository;

    public function __construct(ProyekRepository $proyekRepository, MateriRepository $materiRepository, ProyekPertemuanRepository $proyekPertemuanRepository)
    {
        $this->proyekRepository = $proyekRepository;
        $this->materiRepository = $materiRepository;
        $this->proyekPertemuanRepository = $proyekPertemuanRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'materi_id' => 'required|exists:materis,id',
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'tenggat' => 'required|date',
            'nama_pertemuan_1' => 'required|string',
            'tanggal_mulai_1' => 'required|date',
            'tanggal_selesai_1' => 'required|date|after_or_equal:tanggal_mulai_1',
            'nama_pertemuan_2' => 'required|string',
            'tanggal_mulai_2' => 'required|date',
            'tanggal_selesai_2' => 'required|date|after_or_equal:tanggal_mulai_2',
            'nama_pertemuan_3' => 'required|string',
            'tanggal_mulai_3' => 'required|date',
            'tanggal_selesai_3' => 'required|date|after_or_equal:tanggal_mulai_3',
            'nama_pertemuan_4' => 'required|string',
            'tanggal_mulai_4' => 'required|date',
            'tanggal_selesai_4' => 'required|date|after_or_equal:tanggal_mulai_4',
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

            $proyekExistInMateri = $this->materiRepository->checkKuisOrProyek($validatedData['materi_id'], 'proyek');
            if ($proyekExistInMateri) {
                return redirect()->back()->with('warning', 'Materi ini sudah memiliki proyek')->withInput();
            }

            DB::beginTransaction();
            try {
                $proyekId = $this->proyekRepository->create([
                    'materi_id' => $validatedData['materi_id'],
                    'nama' => $validatedData['nama'],
                    'deskripsi' => $validatedData['deskripsi'],
                    'tenggat' => $validatedData['tenggat'],
                    'status' => ProyekStatus::BELUM,
                    'created_at' => $validatedData['created_at'],
                    'updated_at' => $validatedData['updated_at'],
                ]);

                $this->proyekPertemuanRepository->create([
                    'proyek_id' => $proyekId,
                    'nama_pertemuan_1' => $validatedData['nama_pertemuan_1'],
                    'tanggal_mulai_1' => $validatedData['tanggal_mulai_1'],
                    'tanggal_selesai_1' => $validatedData['tanggal_selesai_1'],
                    'nama_pertemuan_2' => $validatedData['nama_pertemuan_2'],
                    'tanggal_mulai_2' => $validatedData['tanggal_mulai_2'],
                    'tanggal_selesai_2' => $validatedData['tanggal_selesai_2'],
                    'nama_pertemuan_3' => $validatedData['nama_pertemuan_3'],
                    'tanggal_mulai_3' => $validatedData['tanggal_mulai_3'],
                    'tanggal_selesai_3' => $validatedData['tanggal_selesai_3'],
                    'nama_pertemuan_4' => $validatedData['nama_pertemuan_4'],
                    'tanggal_mulai_4' => $validatedData['tanggal_mulai_4'],
                    'tanggal_selesai_4' => $validatedData['tanggal_selesai_4'],
                ]);

                DB::commit();
                return redirect()->back()->with('success', 'Proyek berhasil ditambahkan');
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Gagal membuat proyek: ' . $e->getMessage());
            }
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

                DB::beginTransaction();
                try {
                    $proyek = $this->proyekRepository->getById($id);

                    $this->proyekRepository->update([
                        'nama' => $validatedData['nama'],
                        'deskripsi' => $validatedData['deskripsi'],
                        'tenggat' => $validatedData['tenggat'],
                        'updated_at' => now(),
                    ], $id);

                    if ($proyek->pertemuan) {
                        $this->proyekPertemuanRepository->update($proyek->pertemuan->id, [
                            'nama_pertemuan_1' => $validatedData['nama_pertemuan_1'],
                            'tanggal_mulai_1' => $validatedData['tanggal_mulai_1'],
                            'tanggal_selesai_1' => $validatedData['tanggal_selesai_1'],
                            'nama_pertemuan_2' => $validatedData['nama_pertemuan_2'],
                            'tanggal_mulai_2' => $validatedData['tanggal_mulai_2'],
                            'tanggal_selesai_2' => $validatedData['tanggal_selesai_2'],
                            'nama_pertemuan_3' => $validatedData['nama_pertemuan_3'],
                            'tanggal_mulai_3' => $validatedData['tanggal_mulai_3'],
                            'tanggal_selesai_3' => $validatedData['tanggal_selesai_3'],
                            'nama_pertemuan_4' => $validatedData['nama_pertemuan_4'],
                            'tanggal_mulai_4' => $validatedData['tanggal_mulai_4'],
                            'tanggal_selesai_4' => $validatedData['tanggal_selesai_4'],
                        ]);
                    } else {
                        $this->proyekPertemuanRepository->create([
                            'proyek_id' => $id,
                            'nama_pertemuan_1' => $validatedData['nama_pertemuan_1'],
                            'tanggal_mulai_1' => $validatedData['tanggal_mulai_1'],
                            'tanggal_selesai_1' => $validatedData['tanggal_selesai_1'],
                            'nama_pertemuan_2' => $validatedData['nama_pertemuan_2'],
                            'tanggal_mulai_2' => $validatedData['tanggal_mulai_2'],
                            'tanggal_selesai_2' => $validatedData['tanggal_selesai_2'],
                            'nama_pertemuan_3' => $validatedData['nama_pertemuan_3'],
                            'tanggal_mulai_3' => $validatedData['tanggal_mulai_3'],
                            'tanggal_selesai_3' => $validatedData['tanggal_selesai_3'],
                            'nama_pertemuan_4' => $validatedData['nama_pertemuan_4'],
                            'tanggal_mulai_4' => $validatedData['tanggal_mulai_4'],
                            'tanggal_selesai_4' => $validatedData['tanggal_selesai_4'],
                        ]);
                    }

                    DB::commit();
                    return to_route('guru.proyek.index')->with('success', 'Proyek berhasil diubah');
                } catch (\Exception $e) {
                    DB::rollBack();
                    return redirect()->back()->with('error', 'Gagal mengupdate proyek: ' . $e->getMessage());
                }
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
