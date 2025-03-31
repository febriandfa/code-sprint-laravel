<?php

namespace App\Repositories;

use App\Enums\RoleType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class KelompokRepository
{
    public function getAll(string $proyekId)
    {
        $kelompoks = DB::table('kelompoks')
            ->where('proyek_id', $proyekId)
            ->get();

        foreach ($kelompoks as $kelompok) {
            $ketua = DB::table('kelompok_anggotas')
                ->leftJoin('users', 'kelompok_anggotas.anggota_id', '=', 'users.id')
                ->where('kelompok_anggotas.kelompok_id', $kelompok->id)
                ->where('kelompok_anggotas.status', 'ketua')
                ->select('users.id as ketua_id', 'users.name as ketua')
                ->first();

            $kelompok->ketua = $ketua->ketua ?? null;
            $kelompok->ketua_id = $ketua->ketua_id ?? null;

            $kelompok->anggotas = DB::table('kelompok_anggotas')
                ->leftJoin('users', 'kelompok_anggotas.anggota_id', '=', 'users.id')
                ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
                ->where('kelompok_anggotas.kelompok_id', $kelompok->id)
                ->select('users.name as nama_anggota', 'user_details.no_absen', 'kelompok_anggotas.*')
                ->get();

            $kelompok->is_full = count($kelompok->anggotas) === $kelompok->jumlah_anggota;
        }

        return $kelompoks;
    }

    public function getJoinedKelompok(string $proyekId)
    {
        return DB::table('kelompok_anggotas')
            ->leftJoin('kelompoks', 'kelompok_anggotas.kelompok_id', '=', 'kelompoks.id')
            ->where('kelompoks.proyek_id', $proyekId)
            ->where('anggota_id', Auth::user()->id)
            ->select('kelompok_anggotas.*')
            ->first();
    }

    public function getKetuaCandidate(string $proyekId)
    {
        return DB::table('users')
            ->where('users.role', RoleType::SISWA)
            ->whereNotExists(function($query) use ($proyekId) {
                $query->select(DB::raw(1))
                    ->from('kelompok_anggotas')
                    ->join('kelompoks', 'kelompok_anggotas.kelompok_id', '=', 'kelompoks.id')
                    ->whereRaw('kelompok_anggotas.anggota_id = users.id')
                    // ->where('kelompok_anggotas.status', 'ketua')
                    ->where('kelompoks.proyek_id', $proyekId);
            })
            ->get();
    }

    public function getById($id)
    {
        $kelompok = DB::table('kelompoks')->where('id', $id)->first();

        $ketua = DB::table('kelompok_anggotas')
                ->leftJoin('users', 'kelompok_anggotas.anggota_id', '=', 'users.id')
                ->where('kelompok_anggotas.kelompok_id', $kelompok->id)
                ->where('kelompok_anggotas.status', 'ketua')
                ->select('users.id as ketua_id', 'users.name as ketua')
                ->first();

        $kelompok->ketua = $ketua->ketua ?? null;
        $kelompok->ketua_id = $ketua->ketua_id ?? null;

        return $kelompok;
    }

    public function getByIdWithAnggota(string $id)
    {
        $kelompok = $this->getById($id);

        $kelompok->anggotas = DB::table('kelompok_anggotas')
            ->leftJoin('users', 'kelompok_anggotas.anggota_id', '=', 'users.id')
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->where('kelompok_anggotas.kelompok_id', $kelompok->id)
            ->select('users.name as nama_anggota', 'user_details.no_absen', 'kelompok_anggotas.*')
            ->get();

        return $kelompok;
    }

    public function getKelompokByCurrentProyekAndUser(string $proyekId)
    {
        $kelompok = DB::table('kelompoks')
            ->leftJoin('kelompok_anggotas', 'kelompok_anggotas.kelompok_id', '=', 'kelompoks.id')
            ->where('kelompok_anggotas.anggota_id', Auth::id())
            ->where('kelompoks.proyek_id', $proyekId)
            ->select('kelompoks.*')
            ->first();

        if ($kelompok) {
            $kelompok->anggotas = DB::table('kelompok_anggotas')
                ->leftJoin('users', 'kelompok_anggotas.anggota_id', '=', 'users.id')
                ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
                ->where('kelompok_anggotas.kelompok_id', $kelompok->id)
                ->select('users.name as nama_anggota', 'user_details.no_absen', 'kelompok_anggotas.*')
                ->get();
        }

        return $kelompok;
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            $kelompokId = DB::table('kelompoks')->insertGetId([
                'proyek_id' => $data['proyek_id'],
                'nama' => $data['nama'],
                'jumlah_anggota' => $data['jumlah_anggota'],
                'masalah' => $data['masalah'],
            ]);

            DB::table('kelompok_anggotas')->insert([
                'kelompok_id' => $kelompokId,
                'anggota_id' => $data['ketua_id'],
                'status' => 'ketua',
            ]);

            DB::commit();

            return $kelompokId;
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function update($data, $id)
    {
        DB::beginTransaction();
        try {
            DB::table('kelompoks')->where('id', $id)->update([
                'nama' => $data['nama'],
                'jumlah_anggota' => $data['jumlah_anggota'],
                'masalah' => $data['masalah'],
            ]);

            if (isset($data['ketua_id'])) {
                DB::table('kelompok_anggotas')
                    ->where('kelompok_id', $id)
                    ->where('status', 'ketua')
                    ->delete();

                DB::table('kelompok_anggotas')->insert([
                    'kelompok_id' => $id,
                    'anggota_id' => $data['ketua_id'],
                    'status' => 'ketua',
                ]);
            }

            DB::commit();

            return $id;
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function delete($id)
    {
        return DB::table('kelompoks')->where('id', $id)->delete();
    }

    public function join(string $kelompokId)
    {
        return DB::table('kelompok_anggotas')->insertGetId([
            'kelompok_id' => $kelompokId,
            'anggota_id' => Auth::user()->id,
            'status' => 'anggota',
        ]);
    }
}
