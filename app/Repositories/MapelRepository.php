<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MapelRepository
{
    public function create(array $data)
    {
        return DB::table('mapels')->insertGetId($data);
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
