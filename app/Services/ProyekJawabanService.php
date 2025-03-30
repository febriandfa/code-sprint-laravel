<?php

namespace App\Services;

use App\Enums\ProyekAnswerStatus;
use App\Enums\ProyekStatus;
use App\Repositories\ProyekJawabanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProyekJawabanService
{
    /**
     * Create a new class instance.
     */

    protected $proyekJawabanRepository;

    public function __construct(ProyekJawabanRepository $proyekJawabanRepository)
    {
        $this->proyekJawabanRepository = $proyekJawabanRepository;
    }

    public function validateStore(array $data)
    {
        return Validator::make($data, [
            'kelompok_id' => 'required|exists:kelompoks,id',
            'rumusan_masalah' => 'required|string',
        ]);
    }

    public function validateUpdate(array $data, string $step)
    {
        $rules = [];
        if ($step == 2) {
            $rules = ['rumusan_masalah' => 'required|string',];
        } elseif ($step == 3) {
            $rules = ['indikator' => 'required|string',];
        } elseif ($step == 4) {
            $rules = ['analisis_masalah' => 'file|mimes:pdf|max:2048',];
        } elseif ($step == 5) {
            $rules = ['rencana_proyek' => 'required|string',];
        } elseif ($step == 6) {
            $rules = ['jadwal_proyek' => 'file|mimes:xlsx,xls,csv|max:2048',];
        }

        return Validator::make($data, $rules);
    }

    public function validateJadwal(array $data)
    {
        return Validator::make($data, [
            'proyek_id' => 'required|exists:proyeks,id',
            'kelompok_id' => 'required|exists:kelompoks,id',
            'anggota_id' => 'required|exists:users,id',
            'kegiatan' => 'required|string',
            'tenggat' => 'required|date',
            'status' => 'required|in:' . implode(',', ProyekStatus::values()),
            'file_kegiatan' => 'nullable|file|max:2048',
        ]);
    }

    public function store(Request $request, string $proyekId)
    {
        try {
            $validator = $this->validateStore($request->all());
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->proyekJawabanRepository->create([
                'proyek_id' => $proyekId,
                'kelompok_id' => $validatedData['kelompok_id'],
                'user_id' => Auth::user()->id,
                'jawaban_tahap_2' => $validatedData['rumusan_masalah'],
                'status_tahap_2' => ProyekAnswerStatus::PROSES,
            ]);

            return redirect()->back()->with('success', 'Jawaban berhasil dikirim');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $step = $request->step;
            $validator = $this->validateUpdate($request->all(), $step);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $jawaban = $this->proyekJawabanRepository->getJawabanById($id);

            $answerToUpdate = [];
            if ($step == 2) {
                $answerToUpdate = [
                    'jawaban_tahap_2' => $validatedData['rumusan_masalah'],
                    'status_tahap_2' => ProyekAnswerStatus::PROSES,
                ];
            } elseif ($step == 3) {
                $answerToUpdate = [
                    'jawaban_tahap_3' => $validatedData['indikator'],
                    'status_tahap_3' => ProyekAnswerStatus::PROSES,
                ];
            } elseif ($step == 4) {
                $fileMasalahPath = null;
                if ($request->hasFile('analisis_masalah')) {
                    $fileMasalah = $request->file('analisis_masalah');
                    $extension = $fileMasalah->getClientOriginalName();
                    $fileMasalahName = date('YmdHis') . "." . $extension;

                    $oldPath = storage_path('app/public') . str_replace('/storage', '', $jawaban->jawaban_tahap_4);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }

                    $fileMasalah->move(storage_path('app/public/proyek/analisis_masalah'), $fileMasalahName);
                    $fileMasalahPath = '/storage/proyek/analisis_masalah/' . $fileMasalahName;
                } else {
                    $fileMasalahPath = $jawaban->jawaban_tahap_4;
                };

                $answerToUpdate = [
                    'jawaban_tahap_4' => $fileMasalahPath,
                    'status_tahap_4' => ProyekAnswerStatus::PROSES,
                ];
            } elseif ($step == 5) {
                $answerToUpdate = [
                    'jawaban_tahap_5' => $validatedData['rencana_proyek'],
                    'status_tahap_5' => ProyekAnswerStatus::PROSES,
                ];
            } elseif ($step == 6) {
                $fileJadwalPath = null;
                if ($request->hasFile('jadwal_proyek')) {
                    $fileJadwal = $request->file('jadwal_proyek');
                    $extension = $fileJadwal->getClientOriginalName();
                    $fileJadwalName = date('YmdHis') . "." . $extension;

                    $oldPath = storage_path('app/public') . str_replace('/storage', '', $jawaban->jawaban_tahap_6);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }

                    $fileJadwal->move(storage_path('app/public/proyek/jadwal_proyek'), $fileJadwalName);
                    $fileJadwalPath = '/storage/proyek/jadwal_proyek/' . $fileJadwalName;
                } else {
                    $fileJadwalPath = $jawaban->jawaban_tahap_6;
                };

                $answerToUpdate = [
                    'jawaban_tahap_6' => $fileJadwalPath,
                    'status_tahap_6' => ProyekAnswerStatus::PROSES,
                ];
            }

            $this->proyekJawabanRepository->update($answerToUpdate, $id);

            return redirect()->back()->with('success', 'Jawaban berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function storeJadwal(Request $request)
    {
        try {
            $validator = $this->validateJadwal($request->all());
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $fileKegiatanPath = null;
            if ($request->hasFile('file_kegiatan')) {
                $fileKegiatan = $request->file('file_kegiatan');
                $extension = $fileKegiatan->getClientOriginalName();
                $fileKegiatanName = date('YmdHis') . "." . $extension;
                $fileKegiatan->move(storage_path('app/public/proyek/file_kegiatan'), $fileKegiatanName);
                $fileKegiatanPath = '/storage/proyek/file_kegiatan/' . $fileKegiatanName;
            };
            $validatedData['file_kegiatan'] = $fileKegiatanPath;

            $this->proyekJawabanRepository->createJadwal($validatedData);

            return redirect()->back()->with('success', 'Jadwal berhasil dikirim');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function updateJadwal(Request $request, string $id)
    {
        try {
            $validator = $this->validateJadwal($request->all());
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $jadwal = $this->proyekJawabanRepository->getJadwalById($id);

            $fileKegiatanPath = null;
            if ($request->hasFile('file_kegiatan')) {
                $fileKegiatan = $request->file('file_kegiatan');
                $extension = $fileKegiatan->getClientOriginalName();
                $fileKegiatanName = date('YmdHis') . "." . $extension;

                $oldPath = storage_path('app/public') . str_replace('/storage', '', $jadwal->file_kegiatan);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }

                $fileKegiatan->move(storage_path('app/public/proyek/file_kegiatan'), $fileKegiatanName);
                $fileKegiatanPath = '/storage/proyek/file_kegiatan/' . $fileKegiatanName;
                $validatedData['file_kegiatan'] = $fileKegiatanPath;
            } else {
                $validatedData['file_kegiatan'] = $jadwal->file_kegiatan;
            };

            $this->proyekJawabanRepository->updateJadwal($validatedData, $id);

            return redirect()->back()->with('success', 'Jadwal berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function deleteJadwal(string $id)
    {
        try {
            $jadwal = $this->proyekJawabanRepository->getJadwalById($id);

            if ($jadwal->file_kegiatan) {
                $oldPath = storage_path('app/public') . str_replace('/storage', '', $jadwal->file_kegiatan);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            $this->proyekJawabanRepository->deleteJadwal($id);

            return redirect()->back()->with('success', 'Jadwal berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
