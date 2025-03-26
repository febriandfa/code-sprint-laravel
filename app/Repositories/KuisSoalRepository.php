<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KuisSoalRepository
{
    public function getAllByKuisId(string $kuisId)
    {
        $soals = DB::table('kuis_soals')
            ->where('kuis_id', $kuisId)
            ->get();

        $soals->map(function ($soal) {
            $soal->opsis = DB::table('kuis_opsis')
                ->where('kuis_soal_id', $soal->id)
                ->get();
            return $soal;
        });

        return $soals;
    }

    public function getById($id)
    {
        return DB::table('kuis_soals')->where('id', $id)->first();
    }

    public function create($data, $kuisId)
    {
        DB::beginTransaction();
        try {
            $soalId = DB::table('kuis_soals')->insertGetId([
                'kuis_id' => $kuisId,
                'soal' => $data['soal'],
                'lampiran' => $data['lampiran'],
                'jawaban' => $data['jawaban'],
                'urutan' => $data['urutan'],
                'poin' => $data['poin'],
            ]);

            $opsis = [];
            foreach ($data['opsis'] as $opsi) {
                $opsis[] = [
                    'kuis_soal_id' => $soalId,
                    'opsi' => $opsi['opsi'],
                    'label' => $opsi['label'],
                ];
            }
            DB::table('kuis_opsis')->insert($opsis);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update($data, $id)
    {
        DB::beginTransaction();
        try {
            DB::table('kuis_soals')->where('id', $id)->update([
                'soal' => $data['soal'],
                'lampiran' => $data['lampiran'],
                'jawaban' => $data['jawaban'],
                'urutan' => $data['urutan'],
                'poin' => $data['poin'],
            ]);

            DB::table('kuis_opsis')->where('kuis_soal_id', $id)->delete();

            $opsis = [];
            foreach ($data['opsis'] as $opsi) {
                $opsis[] = [
                    'kuis_soal_id' => $id,
                    'opsi' => $opsi['opsi'],
                    'label' => $opsi['label'],
                ];
            }
            DB::table('kuis_opsis')->insert($opsis);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        $soal = $this->getById($id);

        DB::beginTransaction();
        try {
            DB::table('kuis_soals')->where('id', $id)->delete();

            DB::table('kuis_soals')
                ->where('kuis_id', $soal->kuis_id)
                ->where('urutan', '>', $soal->urutan)
                ->decrement('urutan');

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
