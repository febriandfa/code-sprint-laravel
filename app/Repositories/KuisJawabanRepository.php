<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KuisJawabanRepository
{
    public function createJawaban(array $data)
    {
        return DB::table('kuis_jawabans')->insertGetId($data);
    }

    public function createNilai(array $data)
    {
        return DB::table('kuis_nilais')->insertGetId($data);
    }

    public function getAllHasil(string $kuisId)
    {
        return DB::table('kuis_nilais')
            ->leftJoin('users', 'users.id', '=', 'kuis_nilais.user_id')
            ->where('kuis_nilais.kuis_id', $kuisId)
            ->select('users.name as nama_siswa', 'kuis_nilais.*')
            ->orderBy('kuis_nilais.total_poin', 'desc')
            ->get();
    }

    public function getHasilByKuisIdSiswaId(string $kuisId, string $siswaId)
    {
        return DB::table('kuis_nilais')
            ->leftJoin('users', 'users.id', '=', 'kuis_nilais.user_id')
            ->where('kuis_nilais.kuis_id', $kuisId)
            ->where('kuis_nilais.user_id', $siswaId)
            ->select('users.name as nama_siswa', 'kuis_nilais.*')
            ->first();
    }

    public function getJawabanByKuisIdSiswaId(string $kuisId, string $siswaId)
    {
        return DB::table('kuis_jawabans')
            ->leftJoin('kuis_soals', 'kuis_soals.id', '=', 'kuis_jawabans.kuis_soal_id')
            ->where('kuis_soals.kuis_id', $kuisId)
            ->where('kuis_jawabans.user_id', $siswaId)
            ->select('kuis_jawabans.*', 'kuis_soals.kuis_id')
            ->get();
    }
}
