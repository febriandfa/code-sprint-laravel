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
            ->leftJoin('kelases', 'proyeks.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'proyeks.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->whereIn('proyeks.kelas_id', $kelasIds)
            ->whereIn('proyeks.mapel_id', $mapelIds)
            ->get();
    }

    public function getBySiswa()
    {
        $userId = Auth::user()->id;
        $kelasId = Auth::user()->userDetail->kelas_id;

        return DB::table('proyeks')
            ->leftJoin('kelases', 'proyeks.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'proyeks.mapel_id', '=', 'mapels.id')
            ->leftJoin('proyek_jawabans', function($join) use ($userId) {
                $join->on('proyeks.id', '=', 'proyek_jawabans.proyek_id')
                        ->where('proyek_jawabans.user_id', $userId);
            })
            ->leftJoin('proyek_nilais', function($join) use ($userId) {
                $join->on('proyeks.id', '=', 'proyek_nilais.proyek_id')
                        ->where('proyek_nilais.user_id', $userId);
            })
            ->select(
                'proyeks.*',
                'kelases.nama as kelas',
                'mapels.nama as mapel',
                DB::raw('IF(proyek_jawabans.id IS NOT NULL, true, false) as is_processed'),
                DB::raw('IF(proyek_nilais.id IS NOT NULL, true, false) as is_completed'),
                'proyek_nilais.nilai'
            )
            ->where('proyeks.kelas_id', $kelasId)
            ->groupBy('proyeks.id', 'kelases.nama', 'mapels.nama', 'proyek_jawabans.id', 'proyek_nilais.id', 'proyek_nilais.nilai')
            ->get();
    }

    public function getById(string $id)
    {
        return DB::table('proyeks')
            ->leftJoin('kelases', 'proyeks.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'proyeks.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
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

    public function storeAnswer(array $data)
    {
        return DB::table('proyek_jawabans')->insertGetId($data);
    }

    public function updateAnswer(array $data, string $id)
    {
        return DB::table('proyek_jawabans')->where('id', $id)->update($data);
    }

    public function getJawabanByProyekIdKelompokId(string $proyekId, string $kelompokId)
    {
        return DB::table('proyek_jawabans')
            ->where('proyek_id', $proyekId)
            ->where('kelompok_id', $kelompokId)
            ->first();
    }
}
