<?php

namespace App\Repositories;

use App\Enums\RoleType;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function getAll(string $role)
    {
        return DB::table('users')
            ->where('users.role', $role)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->leftJoin('kelases', 'user_details.kelas_id', '=', 'kelases.id')
            ->leftJoin('mapels', 'user_details.mapel_id', '=', 'mapels.id')
            ->select(
                'users.*',
                'user_details.kelas_id',
                'user_details.no_absen',
                'user_details.combination',
                'kelases.nama as kelas',
                'user_details.mapel_id',
                'mapels.nama as mapel'
            )
            ->get();
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
                'kelas_id' => $data['kelas_id']
            ];

            if ($data['role'] === RoleType::SISWA) {
                $userDetails['no_absen'] = $data['no_absen'];
            } elseif ($data['role'] === RoleType::GURU) {
                $userDetails['mapel_id'] = $data['mapel_id'];
            }

            DB::table('user_details')->insert($userDetails);

            $user->assignRole($data['role']);
        });
    }

    public function getById(string $id)
    {
        return DB::table('users')
            ->where('users.id', $id)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->select('users.*', 'user_details.kelas_id', 'user_details.no_absen', 'user_details.mapel_id')
            ->first();
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
                'kelas_id' => $data['kelas_id'] ?? null,
                'combination' => $data['combination'] ?? null
            ]);

            if ($data['role'] === RoleType::SISWA) {
                $userDetails['no_absen'] = $data['no_absen'] ?? null;
            } elseif ($data['role'] === RoleType::GURU) {
                $userDetails['mapel_id'] = $data['mapel_id'] ?? null;
            }

            DB::table('user_details')->updateOrInsert(['user_id' => $id], $userDetails);
        });
    }

    public function delete(string $id)
    {
        return DB::table('users')->where('id', $id)->delete();
    }
}
