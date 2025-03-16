<?php

namespace App\Repositories;

use App\Enums\RoleType;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function getAll(string $role)
    {
        $users = DB::table('users')
            ->where('users.role', $role)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->leftJoin('kelases', 'user_details.kelas_id', '=', 'kelases.id')
            ->select(
                'users.*',
                'user_details.kelas_id',
                'user_details.no_absen',
                'user_details.combination',
                'kelases.nama as kelas',
            )
            ->get();

            if ($role === RoleType::GURU) {
                $users->map(function ($user) {
                    $user->kelases = DB::table('user_kelases as uk')
                        ->where('uk.guru_id', $user->id)
                        ->leftJoin('kelases', 'uk.kelas_id', '=', 'kelases.id')
                        ->select('uk.*', 'kelases.nama')
                        ->get();

                    $user->mapels = DB::table('user_mapels as um')
                        ->where('um.guru_id', $user->id)
                        ->leftJoin('mapels', 'um.mapel_id', '=', 'mapels.id')
                        ->select('um.*', 'mapels.nama')
                        ->get();
                });
            }

        return $users;
    }

    public function getUserCount(string $role, string $kelasId)
    {
        return DB::table('users')
            ->where('users.role', $role)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->where("user_details.kelas_id", $kelasId)
            ->count();
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $user = \App\Models\User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role' => $data['role']
            ]);

            $userDetails = [
                'user_id' => $user->id,
                'combination' => $data['combination'],
            ];

            if ($data['role'] === RoleType::SISWA) {
                $userDetails['kelas_id'] = $data['kelas_id'];
                $userDetails['no_absen'] = $data['no_absen'];
            }

            DB::table('user_details')->insert($userDetails);

            if ($data['role'] === RoleType::GURU) {
                $kelasData = [];
                foreach ($data['kelas_id'] as $kelasId) {
                    $kelasData[] = [
                        'guru_id' => $user->id,
                        'kelas_id' => $kelasId
                    ];
                }
                if (!empty($kelasData)) {
                    DB::table('user_kelases')->insert($kelasData);
                }

                $mapelData = [];
                foreach ($data['mapel_id'] as $mapelId) {
                    $mapelData[] = [
                        'guru_id' => $user->id,
                        'mapel_id' => $mapelId
                    ];
                }
                if (!empty($mapelData)) {
                    DB::table('user_mapels')->insert($mapelData);
                }
            }

            $user->assignRole($data['role']);
        });
    }

    public function getById(string $id)
    {
        $user = DB::table('users')
            ->where('users.id', $id)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->select('users.*', 'user_details.kelas_id', 'user_details.no_absen', 'user_details.mapel_id')
            ->first();

            if ($user->role === RoleType::GURU) {
                $user->kelases = DB::table('user_kelases as uk')
                    ->where('uk.guru_id', $id)
                    ->leftJoin('kelases', 'uk.kelas_id', '=', 'kelases.id')
                    ->select('uk.*', 'kelases.nama')
                    ->get();

                $user->mapels = DB::table('user_mapels as um')
                    ->where('um.guru_id', $id)
                    ->leftJoin('mapels', 'um.mapel_id', '=', 'mapels.id')
                    ->select('um.*', 'mapels.nama')
                    ->get();
            }

        return $user;
    }

    public function update(array $data, string $id)
    {
        return DB::transaction(function () use ($data, $id) {
            $userData = array_filter([
                'name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null,
                'password' => !empty($data['password']) ? bcrypt($data['password']) : null
            ]);

            DB::table('users')->where('id', $id)->update($userData);

            $userDetails = array_filter([
                'combination' => $data['combination'] ?? null
            ]);

            if ($data['role'] === RoleType::SISWA) {
                $userDetails['kelas_id'] = $data['kelas_id'] ?? null;
                $userDetails['no_absen'] = $data['no_absen'] ?? null;
            }

            DB::table('user_details')->updateOrInsert(['user_id' => $id], $userDetails);

            if ($data['role'] === RoleType::GURU) {
                DB::table('user_kelases')->where('guru_id', $id)->delete();
                $kelasData = [];
                foreach ($data['kelas_id'] as $kelasId) {
                    $kelasData[] = [
                        'guru_id' => $id,
                        'kelas_id' => $kelasId
                    ];
                }
                if (!empty($kelasData)) {
                    DB::table('user_kelases')->insert($kelasData);
                }

                DB::table('user_mapels')->where('guru_id', $id)->delete();
                $mapelData = [];
                foreach ($data['mapel_id'] as $mapelId) {
                    $mapelData[] = [
                        'guru_id' => $id,
                        'mapel_id' => $mapelId
                    ];
                }
                if (!empty($mapelData)) {
                    DB::table('user_mapels')->insert($mapelData);
                }
            }
        });
    }

    public function delete(string $id)
    {
        return DB::table('users')->where('id', $id)->delete();
    }
}
