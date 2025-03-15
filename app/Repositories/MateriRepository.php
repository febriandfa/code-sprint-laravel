<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MateriRepository
{
    public function getAll()
    {
        return DB::table('materis')->get();
    }

    public function getById(string $id)
    {
        return DB::table('materis')->where('id', $id)->first();
    }

    public function create(array $data)
    {
        return DB::table('materis')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('materis')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('materis')->where('id', $id)->delete();
    }
}
