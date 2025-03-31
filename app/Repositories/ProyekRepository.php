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
            ->get();
    }

    public function getBySiswa()
    {
        $userId = Auth::user()->id;
        $kelasId = Auth::user()->userDetail->kelas_id;

        return DB::table('proyeks')
            ->leftJoin('materis', 'proyeks.materi_id', '=', 'materis.id')
            ->leftJoin('kelompok_anggotas', function($join) use ($userId) {
                $join->where('kelompok_anggotas.anggota_id', $userId);
            })
            ->leftJoin('kelompoks', function($join) {
                $join->on('kelompoks.id', '=', 'kelompok_anggotas.kelompok_id')
                    ->on('kelompoks.proyek_id', '=', 'proyeks.id');
            })
            ->leftJoin('proyek_jawabans', function($join) {
                $join->on('proyeks.id', '=', 'proyek_jawabans.proyek_id')
                    ->whereRaw('proyek_jawabans.user_id IN (
                        SELECT anggota_id FROM kelompok_anggotas
                        WHERE kelompok_id = kelompoks.id
                    )');
            })
            // ->leftJoin('proyek_jawabans', function($join) use ($userId) {
            //     $join->on('proyeks.id', '=', 'proyek_jawabans.proyek_id')
            //             ->where('proyek_jawabans.user_id', $userId);
            // })
            ->leftJoin('proyek_nilais', function($join) use ($userId) {
                $join->on('proyeks.id', '=', 'proyek_nilais.proyek_id')
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
            ->groupBy(
                'proyeks.id',
                'materis.judul',
                'proyek_jawabans.id',
                'proyek_nilais.id',
                'proyek_nilais.nilai'
            )
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
