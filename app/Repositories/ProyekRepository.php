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

    public function getById(string $id)
    {
        return DB::table('proyeks')
            ->leftJoin('kelases', 'proyeks.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'proyeks.mapel_id', '=', 'mapels.id')
            ->select('proyeks.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->where('id', $id)
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
