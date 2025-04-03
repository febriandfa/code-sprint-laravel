<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
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

    public function getJadwalById(string $id)
    {
        return DB::table('proyek_jadwals')->where('id', $id)->first();
    }

    public function createJadwal(array $data)
    {
        return DB::table('proyek_jadwals')->insertGetId($data);
    }

    public function updateJadwal(array $data, string $id)
    {
        return DB::table('proyek_jadwals')->where('id', $id)->update($data);
    }

    public function deleteJadwal(string $id)
    {
        return DB::table('proyek_jadwals')->where('id', $id)->delete();
    }

    public function getLatestNilai()
    {
        $kelompokIds = DB::table('kelompok_anggotas')
            ->where('anggota_id', Auth::user()->id)
            ->pluck('kelompok_id')
            ->toArray();

        return DB::table('proyek_jawabans')
            ->leftJoin('proyeks', 'proyek_jawabans.proyek_id', '=', 'proyeks.id')
            ->leftJoin('proyek_nilais', function ($join) {
                $join->on('proyek_nilais.proyek_id', '=', 'proyek_jawabans.proyek_id')
                    ->on('proyek_nilais.kelompok_id', '=', 'proyek_jawabans.kelompok_id');
            })
            ->whereIn('proyek_jawabans.kelompok_id', $kelompokIds)
            ->select(
                'proyek_jawabans.created_at',
                'proyeks.nama',
                'proyek_nilais.nilai',
            )
            ->orderBy('proyek_jawabans.created_at', 'desc')
            ->first();
    }
}
