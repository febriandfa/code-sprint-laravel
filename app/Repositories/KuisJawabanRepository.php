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
}
