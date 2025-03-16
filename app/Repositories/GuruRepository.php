<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GuruRepository
{
    public function getMapelGuru()
    {
        $userId = Auth::user()->id;

        $mapelIds = DB::table('user_mapels')
            ->where('guru_id', $userId)
            ->pluck('mapel_id')
            ->toArray();

        return DB::table('mapels')
            ->whereIn('mapels.id', $mapelIds)
            ->get();
    }

    public function getKelasGuru()
    {
        $userId = Auth::user()->id;

        $kelasIds = DB::table('user_kelases')
            ->where('guru_id', $userId)
            ->pluck('kelas_id')
            ->toArray();

        return DB::table('kelases')
            ->whereIn('kelases.id', $kelasIds)
            ->get();
    }
}
