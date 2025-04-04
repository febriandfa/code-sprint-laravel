<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NilaiRepository
{
    public function getAllBySiswa(string $siswaId)
    {
        $user = DB::table('user_details')
            ->where('user_details.user_id', $siswaId)
            ->first();

        $mapelIds = DB::table('user_mapels')
            ->where('guru_id', Auth::user()->id)
            ->pluck('mapel_id')
            ->toArray();

        $materis = DB::table('materis')
            ->where('materis.kelas_id', $user->kelas_id)
            ->whereIn('materis.mapel_id', $mapelIds)
            ->select('materis.id', 'materis.judul', 'materis.kelas_id', 'materis.created_at', 'materis.updated_at')
            ->get();

        foreach ($materis as $materi) {
            $nilaiKuis = DB::table('kuises')
                ->leftJoin('kuis_nilais', 'kuises.id', '=', 'kuis_nilais.kuis_id')
                ->where('kuises.materi_id', $materi->id)
                ->where('kuis_nilais.user_id', $siswaId)
                ->value('kuis_nilais.total_poin');

            $nilaiProyek = DB::table('proyeks')
                ->leftJoin('proyek_nilais', 'proyeks.id', '=', 'proyek_nilais.proyek_id')
                ->where('proyeks.materi_id', $materi->id)
                ->where('proyek_nilais.user_id', $siswaId)
                ->value('proyek_nilais.nilai');

            $materi->user_id = $siswaId;
            $materi->nilai_kuis = $nilaiKuis;
            $materi->nilai_proyek = $nilaiProyek;
        }

        return $materis;
    }
}
