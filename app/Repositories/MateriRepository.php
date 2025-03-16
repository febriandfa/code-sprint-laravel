<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MateriRepository
{
    public function getAll()
    {
        return DB::table('materis')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->select('materis.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->get();
    }

    public function getByGuru()
    {
        $userId = Auth::user()->id;

        $mapelIds = DB::table('user_mapels')->where('guru_id', $userId)->pluck('mapel_id');
        $kelasIds = DB::table('user_kelases')->where('guru_id', $userId)->pluck('kelas_id');

        return DB::table('materis')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->select('materis.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->whereIn('materis.kelas_id', $kelasIds)
            ->whereIn('materis.mapel_id', $mapelIds)
            ->get();
    }

    public function getById(string $id)
    {
        return DB::table('materis')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->select('materis.*', 'kelases.nama as kelas', 'mapels.nama as mapel')
            ->where('materis.id', $id)
            ->first();
    }

    public function create(array $data)
    {
        return DB::table('materis')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('materis')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('materis')->where('id', $id)->delete();
    }
}
