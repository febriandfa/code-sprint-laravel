<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ProyekJawabanRepository
{
    public function create(array $data)
    {
        return DB::table('proyek_jawabans')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('proyek_jawabans')->where('id', $id)->update($data);
    }

    public function getJawabanById(string $id)
    {
        return DB::table('proyek_jawabans')->where('id', $id)->first();
    }

    public function getJawabanByProyekIdKelompokId(string $proyekId, string $kelompokId)
    {
        return DB::table('proyek_jawabans')
            ->where('proyek_id', $proyekId)
            ->where('kelompok_id', $kelompokId)
            ->first();
    }

    public function getJadwalByProyekIdKelompokId(string $proyekId, string $kelompokId)
    {
        return DB::table('proyek_jadwals')
            ->where('proyek_id', $proyekId)
            ->where('kelompok_id', $kelompokId)
            ->get();
    }

    public function createJadwal(array $data)
    {
        try {
            return DB::table('proyek_jadwals')->insertGetId($data);
        } catch (\Exception $e) {
            dd($e);
            return false;
        }
    }

    public function updateJadwal(array $data, string $id)
    {
        return DB::table('proyek_jadwals')->where('id', $id)->update($data);
    }
}
