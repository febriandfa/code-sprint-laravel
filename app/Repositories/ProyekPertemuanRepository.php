<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ProyekPertemuanRepository
{
    public function create(array $data)
    {
        return DB::table('proyek_pertemuans')->insertGetId($data);
    }

    public function update(int $id, array $data)
    {
        return DB::table('proyek_pertemuans')
            ->where('id', $id)
            ->update($data);
    }

    public function delete(int $id)
    {
        return DB::table('proyek_pertemuans')
            ->where('id', $id)
            ->delete();
    }
}
