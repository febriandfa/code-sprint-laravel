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

    public function getUserCount(string $role, string $referenceId)
    {
        $column = $role === RoleType::GURU ? 'mapel_id' : 'kelas_id';

        return DB::table('users')
            ->where('users.role', $role)
            ->leftJoin('user_details', 'users.id', '=', 'user_details.user_id')
            ->where("user_details.{$column}", $referenceId)
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

            if ($data['role'] === RoleType::SISWA) {
                DB::table('user_details')->insert([
                    'user_id' => $user->id,
                    'no_absen' => $data['no_absen'],
                    'combination' => $data['combination'],
                    'kelas_id' => $data['kelas_id']
                ]);
                $user->assignRole(RoleType::SISWA);
            } elseif ($data['role'] === RoleType::GURU) {
                DB::table('user_details')->insert([
                    'user_id' => $user->id,
                    'combination' => $data['combination'],
                    'mapel_id' => $data['mapel_id']
                ]);
                $user->assignRole(RoleType::GURU);
            }
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
            $userData = [
                'name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null
            ];

            if (!empty($data['password'])) {
                $userData['password'] = bcrypt($data['password']);
            }

            if (!empty($data['combination'])) {
                $combination = $data['combination'];
            }

            DB::table('users')->where('id', $id)->update(array_filter($userData));

            if ($data['role'] === RoleType::SISWA) {
                DB::table('user_details')->updateOrInsert(
                    ['user_id' => $id],
                    [
                        'no_absen' => $data['no_absen'] ?? null,
                        'kelas_id' => $data['kelas_id'] ?? null,
                        'combination' => $combination
                    ]
                );
            } elseif ($data['role'] === RoleType::GURU) {
                DB::table('user_details')->updateOrInsert(
                    ['user_id' => $id],
                    [
                        'mapel_id' => $data['mapel_id'] ?? null,
                        'combination' => $combination
                    ],
                );
            }
        });
    }

    public function delete(string $id)
    {
        return DB::table('users')->where('id', $id)->delete();
    }
}
