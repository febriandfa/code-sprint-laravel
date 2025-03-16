<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KelompokRepository
{
    public function getAll()
    {
        return DB::table('kelompoks')->get();
    }

    public function getById($id)
    {
        return DB::table('kelompoks')->where('id', $id)->first();
    }

    public function create($data)
    {
        return DB::table('kelompoks')->insertGetId($data);
    }

    public function update($id, $data)
    {
        return DB::table('kelompoks')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('kelompoks')->where('id', $id)->delete();
    }
}
