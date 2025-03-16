<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KuisSoalRepository
{
    public function getAllByKuisId(string $kuisId)
    {
        return DB::table('kuis_soals')->where('kuis_id', $kuisId)->get();
    }

    public function getById($id)
    {
        return DB::table('kuis_soals')->where('id', $id)->first();
    }

    public function create($data)
    {
        return DB::table('kuis_soals')->insertGetId($data);
    }

    public function update($id, $data)
    {
        return DB::table('kuis_soals')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('kuis_soals')->where('id', $id)->delete();
    }
}
