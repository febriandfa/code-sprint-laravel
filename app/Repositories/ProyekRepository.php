<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProyekRepository
{
    public function getAll()
    {
        return DB::table('proyeks')
            ->leftJoin('kelases', 'proyeks.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'proyeks.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->get();
    }

    public function getByGuru()
    {
        $userId = Auth::user()->id;

        $mapelIds = DB::table('user_mapels')->where('guru_id', $userId)->pluck('mapel_id');
        $kelasIds = DB::table('user_kelases')->where('guru_id', $userId)->pluck('kelas_id');

        return DB::table('proyeks')
            ->leftJoin('materis', 'proyeks.materi_id', '=', 'materis.id')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel', 'materis.judul as materi')
            ->whereIn('materis.kelas_id', $kelasIds)
            ->whereIn('materis.mapel_id', $mapelIds)
            ->orderBy('proyeks.created_at', 'desc')
            ->get();
    }

    public function getBySiswa()
    {
        $userId = Auth::user()->id;
        $kelasId = Auth::user()->userDetail->kelas_id;

        return DB::table('proyeks')
            ->leftJoin('materis', 'proyeks.materi_id', '=', 'materis.id')
            ->leftJoin('kelompoks', function($join) use ($userId) {
                $join->on('kelompoks.proyek_id', '=', 'proyeks.id')
                    ->whereExists(function($query) use ($userId) {
                        $query->select(DB::raw(1))
                            ->from('kelompok_anggotas')
                            ->whereColumn('kelompok_anggotas.kelompok_id', 'kelompoks.id')
                            ->where('kelompok_anggotas.anggota_id', $userId);
                    });
            })
            ->leftJoin('proyek_jawabans', function($join) {
                $join->on('proyek_jawabans.proyek_id', '=', 'proyeks.id')
                    ->on('proyek_jawabans.kelompok_id', '=', 'kelompoks.id');
            })
            ->leftJoin('proyek_nilais', function($join) use ($userId) {
                $join->on('proyek_nilais.proyek_id', '=', 'proyeks.id')
                    ->where('proyek_nilais.user_id', $userId);
            })
            ->select(
                'proyeks.*',
                'materis.judul as materi',
                DB::raw('IF(proyek_jawabans.id IS NOT NULL, true, false) as is_processed'),
                DB::raw('IF(proyek_nilais.id IS NOT NULL, true, false) as is_completed'),
                'proyek_nilais.nilai'
            )
            ->where('materis.kelas_id', $kelasId)
            ->orderBy('proyeks.created_at', 'desc')
            ->distinct()
            ->get();
    }

    public function getById(string $id)
    {
        return DB::table('proyeks')
            ->leftJoin('materis', 'proyeks.materi_id', '=', 'materis.id')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel', 'materis.judul as materi')
            ->where('proyeks.id', $id)
            ->first();
    }

    public function create(array $data)
    {
        return DB::table('proyeks')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('proyeks')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('proyeks')->where('id', $id)->delete();
    }
}
