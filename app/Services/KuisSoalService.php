<?php

namespace App\Services;

use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KuisSoalService
{
    /**
     * Create a new class instance.
     */

    protected $kuisRepository;
    protected $kuisSoalRepository;

    public function __construct(KuisRepository $kuisRepository, KuisSoalRepository $kuisSoalRepository)
    {
        $this->kuisRepository = $kuisRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'soal' => 'required',
            'lampiran' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'jawaban' => 'required|in:A,B,C,D,E',
            'urutan' => 'required|integer',
            'poin' => 'required|integer',
            'opsis' => 'required|array',
            'opsis.*.label' => 'required|in:A,B,C,D,E',
            'opsis.*.opsi' => 'required',
        ]);
    }

    public function create(Request $request, string $kuisId)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();
            $validatedData['created_at'] = now();
            $validatedData['updated_at'] = now();

            $lampiranPath = null;
            if ($request->hasFile('lampiran')) {
                $fileLampiran = $request->file('lampiran');
                $extension = $fileLampiran->getClientOriginalName();
                $lampiranName = date('YmdHis') . "-" . $extension;
                $fileLampiran->move(storage_path('app/public/kuis/lampiran'), $lampiranName);
                $lampiranPath = '/storage/kuis/lampiran/' . $lampiranName;
            };
            $validatedData['lampiran'] = $lampiranPath;

            $this->kuisSoalRepository->create($validatedData, $kuisId);

            return redirect()->back()->with('success', 'Soal berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $kuisId, string $id)
    {
        try {
            // dd($request->all());
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                dd($validator->errors());
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $kuisSoal = $this->kuisSoalRepository->getById($id);

            if ($request->hapus_lampiran) {
                $oldPath = storage_path('app/public') . str_replace('/storage', '', $kuisSoal->lampiran);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
                $validatedData['lampiran'] = null;
            } else {
                if ($request->hasFile('lampiran')) {
                    $fileLampiran = $request->file('lampiran');
                    $extension = $fileLampiran->getClientOriginalName();
                    $lampiranName = date('YmdHis') . "-" . $extension;

                    if ($kuisSoal->lampiran) {
                        $oldPath = storage_path('app/public') . str_replace('/storage', '', $kuisSoal->lampiran);
                        if (file_exists($oldPath)) {
                            unlink($oldPath);
                        }
                    }

                    $fileLampiran->move(storage_path('app/public/kuis/lampiran'), $lampiranName);
                    $lampiranPath = '/storage/kuis/lampiran/' . $lampiranName;
                    $validatedData['lampiran'] = $lampiranPath;
                } else {
                    $validatedData['lampiran'] = $kuisSoal->lampiran;
                }
            }

            $this->kuisSoalRepository->update($validatedData, $id);

            return redirect()->back()->with('success', 'Soal berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $kuisId, string $id)
    {
        try {
            $kuisSoal = $this->kuisSoalRepository->getById($id);

            if ($kuisSoal->lampiran) {
                $oldPath = storage_path('app/public') . str_replace('/storage', '', $kuisSoal->lampiran);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            $this->kuisSoalRepository->delete($id);

            return redirect()->back()->with('success', 'Soal berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
