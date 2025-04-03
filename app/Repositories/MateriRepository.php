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

    public function getBySiswa()
    {
        $user = Auth::user();
        $userId = $user->id;
        $kelasId = $user->userDetail->kelas_id;

        return DB::table('materis')
            ->leftJoin('kelases', 'materis.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'materis.mapel_id', '=', 'mapels.id')
            ->leftJoin('materi_siswas', function($join) use ($userId) {
                $join->on('materi_siswas.materi_id', '=', 'materis.id')
                    ->where('materi_siswas.user_id', $userId);
            })
            ->select('materis.*', 'kelases.nama as kelas', 'mapels.nama as mapel', 'materi_siswas.is_read')
            ->where('materis.kelas_id', $kelasId)
            ->orderBy('materis.created_at', 'desc')
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

    public function checkKuisOrProyek(string $id, string $type)
    {
        $table = $type === 'kuis' ? 'kuises' : 'proyeks';

        return DB::table($table)
            ->where('materi_id', $id)
            ->exists();
    }

    public function read(string $id)
    {
        return DB::table('materi_siswas')->insert([
            'user_id' => Auth::user()->id,
            'materi_id' => $id,
            'is_read' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function checkIsRead(string $id)
    {
        return DB::table('materi_siswas')
            ->where('user_id', Auth::user()->id)
            ->where('materi_id', $id)
            ->exists();
    }
}
