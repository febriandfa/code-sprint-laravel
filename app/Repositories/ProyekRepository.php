<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ProyekRepository
{
    public function getAll()
    {
        return DB::table('proyeks')->get();
    }

    public function getById($id)
    {
        return DB::table('proyeks')->where('id', $id)->first();
    }

    public function create($data)
    {
        return DB::table('proyeks')->insertGetId($data);
    }

    public function update($id, $data)
    {
        return DB::table('proyeks')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('proyeks')->where('id', $id)->delete();
    }
}
