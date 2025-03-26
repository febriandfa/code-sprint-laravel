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

    public function update($id, $data)
    {
        DB::table('kuis_soals')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('kuis_soals')->where('id', $id)->delete();
    }
}
