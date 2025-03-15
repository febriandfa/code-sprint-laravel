<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MapelRepository
{
    public function getAll()
    {
        return DB::table('mapels')
            ->select('id', 'nama',
                DB::raw("SUBSTRING_INDEX(deskripsi, ' ', 30) AS deskripsi")
            )
            ->get();
    }

    public function create(array $data)
    {
        return DB::table('mapels')->insertGetId($data);
    }

    public function getById(string $id)
    {
        return DB::table('mapels')->where('id', $id)->first();
    }

    public function update(array $data, string $id)
    {
        return DB::table('mapels')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('mapels')->where('id', $id)->delete();
    }
}
