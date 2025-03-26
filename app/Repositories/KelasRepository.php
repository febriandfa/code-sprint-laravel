<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KelasRepository
{
    public function getAll()
    {
        return DB::table('kelases')
            ->leftJoin('users', 'kelases.wali_kelas_id', '=', 'users.id')
            ->select('kelases.*', 'users.name as wali_kelas')
            ->get();
    }

    public function getWaliKelas()
    {
        return DB::table('users')->where('role', 'guru')->get();
    }

    public function create(array $data)
    {
        return DB::table('kelases')->insertGetId($data);
    }

    public function getById(string $id)
    {
        return DB::table('kelases')->where('id', $id)->first();
    }

    public function update(array $data, string $id)
    {
        return DB::table('kelases')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('kelases')->where('id', $id)->delete();
    }
}
