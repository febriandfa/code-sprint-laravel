<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class KuisRepository
{
    public function getAll()
    {
        return DB::table('kuises')
            ->leftJoin('materis', 'kuises.materi_id', '=', 'materis.id')
            ->select('kuises.*', 'materis.judul as materi')
            ->get();
    }

    public function getByGuru()
    {
        $userId = Auth::user()->id;

        $mapelIds = DB::table('user_mapels')->where('guru_id', $userId)->pluck('mapel_id');
        $kelasIds = DB::table('user_kelases')->where('guru_id', $userId)->pluck('kelas_id');

        return DB::table('kuises')
            ->leftJoin('materis', 'kuises.materi_id', '=', 'materis.id')
            ->select('kuises.*', 'materis.judul as materi')
            ->whereIn('materis.kelas_id', $kelasIds)
            ->whereIn('materis.mapel_id', $mapelIds)
            ->get();
    }

    public function getBySiswa()
    {
        $userId = Auth::user()->id;
        $kelasId = Auth::user()->userDetail->kelas_id;

        return DB::table('kuises')
            ->leftJoin('materis', 'kuises.materi_id', '=', 'materis.id')
            ->leftJoin('kuis_soals', 'kuises.id', '=', 'kuis_soals.kuis_id')
            ->leftJoin('kuis_nilais', function($join) use ($userId) {
                $join->on('kuises.id', '=', 'kuis_nilais.kuis_id')
                        ->where('kuis_nilais.user_id', $userId);
            })
            ->select(
                'kuises.*',
                'materis.judul as materi',
                DB::raw('COUNT(DISTINCT kuis_soals.id) as total_soal'),
                DB::raw('IF(kuis_nilais.id IS NOT NULL, true, false) as is_completed'),
                'kuis_nilais.total_poin'
            )
            ->where('materis.kelas_id', $kelasId)
            ->groupBy('kuises.id', 'materis.judul', 'kuis_nilais.id', 'kuis_nilais.total_poin')
            ->havingRaw('COUNT(DISTINCT kuis_soals.id) > 1')
            ->get();
    }

    public function getById(string $id)
    {
        return DB::table('kuises')->where('id', $id)->first();
    }

    public function create(array $data)
    {
        return DB::table('kuises')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('kuises')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('kuises')->where('id', $id)->delete();
    }
}
