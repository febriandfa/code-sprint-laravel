<?php

namespace App\Services;

use App\Repositories\KuisJawabanRepository;
use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class KuisService
{
    /**
     * Create a new class instance.
     */

    protected $kuisRepository;
    protected $kuisSoalRepository;
    protected $kuisJawabanRepository;

    public function __construct(
        KuisRepository $kuisRepository,
        KuisSoalRepository $kuisSoalRepository,
        KuisJawabanRepository $kuisJawabanRepository
    )
    {
        $this->kuisRepository = $kuisRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
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
            $validatedData['created_at'] = now();
            $validatedData['updated_at'] = now();

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

    public function answer(Request $request)
    {
        try {
            DB::beginTransaction();

            $soals = $this->kuisSoalRepository->getAllByKuisId($request->kuis_id);
            $jawabans = $request->jawabans;

            $totalPoint = 0;
            $siswaAnswers = [];
            foreach ($soals as $soal) {
                $answer = $jawabans[$soal->urutan] ?? null;
                $correctAnswer = $soal->jawaban;
                $isCorrect = $answer === $correctAnswer;

                $point = $isCorrect ? $soal->poin : 0;

                $siswaAnswers[] = [
                    'kuis_soal_id' => $soal->id,
                    'user_id' => Auth::user()->id,
                    'jawaban' => $answer,
                    'poin' => $point,
                    'is_benar' => $isCorrect
                ];

                if ($answer) {
                    $totalPoint += $point;
                }
            }

            $this->kuisJawabanRepository->createNilai([
                'kuis_id' => $request->kuis_id,
                'user_id' => Auth::user()->id,
                'total_poin' => $totalPoint,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            foreach ($siswaAnswers as $jawaban) {
                $this->kuisJawabanRepository->createJawaban($jawaban);
            }

            DB::commit();

            return to_route('siswa.kuis.index')->with('success', 'Jawaban berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
