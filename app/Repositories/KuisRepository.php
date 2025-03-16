<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class KuisRepository
{
    public function getAll()
    {
        return DB::table('kuises')
            ->leftJoin('materis', 'kuises.materi_id', '=', 'materis.id')
            ->select('kuises.*', 'materis.judul as materi')
            ->get();
    }

    public function getById(string $id)
    {
        return DB::table('kuises')->where('id', $id)->first();
    }

    public function create(array $data)
    {
        return DB::table('kuises')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('kuises')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('kuises')->where('id', $id)->delete();
    }
}
