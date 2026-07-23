<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProyekNilaiRepository
{
    public function getAll()
    {
        return DB::table('proyek_nilais')
            ->leftJoin('users', 'proyek_nilais.user_id', '=', 'users.id')
            ->select('proyek_nilais.*', 'users.name as siswa')
            ->get();
    }

    public function create(array $data)
    {
        return DB::table('proyek_nilais')->insertGetId($data);
    }

    public function update( array $data, string $id)
    {
        try {
            return DB::table('proyek_nilais')->where('id', $id)->update($data);
        } catch (\Exception $e) {
            dd($e);
            return false;
        }
    }

    public function delete(string $id)
    {
        return DB::table('proyek_nilais')->where('id', $id)->delete();
    }

    public function getById(string $id)
    {
        return DB::table('proyek_nilais')
            ->leftJoin('users', 'proyek_nilais.user_id', '=', 'users.id')
            ->where('proyek_nilais.id', $id)
            ->select('proyek_nilais.*', 'users.name as siswa')
            ->first();
    }

    public function getAllByProyekIdKelompokId(string $proyekId, string $kelompokId)
    {
        return DB::table('proyek_nilais')
            ->leftJoin('users', 'proyek_nilais.user_id', '=', 'users.id')
            ->where('proyek_nilais.proyek_id', $proyekId)
            ->where('proyek_nilais.kelompok_id', $kelompokId)
            ->select('proyek_nilais.*', 'users.name as siswa')
            ->get();
    }

    public function getByProyekIdUserId(string $proyekId)
    {
        return DB::table('proyek_nilais')
            ->where('proyek_id', $proyekId)
            ->where('user_id', Auth::user()->id)
            ->first();
    }
}
