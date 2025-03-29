<?php

namespace App\Services;

use App\Enums\ProyekAnswerStatus;
use App\Enums\ProyekStatus;
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

    public function validateStoreAnswer(array $data)
    {
        return Validator::make($data, [
            'kelompok_id' => 'required|exists:kelompoks,id',
            'rumusan_masalah' => 'required|string',
        ]);
    }

    public function validateUpdateAnswer(array $data, string $step)
    {
        $rules = [];
        if ($step == 2) {
            $rules = ['rumusan_masalah' => 'required|string',];
        } elseif ($step == 3) {
            $rules = ['indikator' => 'required|string',];
        } elseif ($step == 4) {
            $rules = ['analisis_masalah' => 'file|mimes:pdf|max:2048',];
        }

        return Validator::make($data, $rules);
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

    public function storeAnswer(Request $request, string $id)
    {
        try {
            $validator = $this->validateStoreAnswer($request->all());
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->proyekRepository->storeAnswer([
                'proyek_id' => $id,
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

    public function updateAnswer(Request $request, string $answerId)
    {
        try {
            $step = $request->step;
            $validator = $this->validateUpdateAnswer($request->all(), $step);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

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
                $filePath = null;
                if ($request->hasFile('analisis_masalah')) {
                    $file = $request->file('analisis_masalah');
                    $extension = $file->getClientOriginalName();
                    $fileName = date('YmdHis') . "." . $extension;
                    $file->move(storage_path('app/public/proyek/analisis_masalah'), $fileName);
                    $filePath = '/storage/proyek/analisis_masalah/' . $fileName;
                };

                $answerToUpdate = [
                    'jawaban_tahap_4' => $filePath,
                    'status_tahap_4' => ProyekAnswerStatus::PROSES,
                ];
            }

            $this->proyekRepository->updateAnswer($answerToUpdate, $answerId);

            return redirect()->back()->with('success', 'Jawaban berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
