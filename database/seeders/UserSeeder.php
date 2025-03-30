<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Siswa Ketua',
                'email' => 'siswa1@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
            ],
            [
                'name' => 'Siswa Anggota',
                'email' => 'siswa2@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
            ],
            [
                'name' => 'Siswa Testing',
                'email' => 'siswa3@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
            ],
            [
                'name' => 'Guru',
                'email' => 'guru@csprint.com',
                'password' => bcrypt('guru123'),
                'role' => RoleType::GURU,
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@csprint.com',
                'password' => bcrypt('admin123'),
                'role' => RoleType::ADMIN,
            ]
        ];

        foreach ($users as $user) {
            $createdUser = \App\Models\User::create($user);
            $createdUser->assignRole($user['role']);

            if ($user['role'] === RoleType::GURU) {
                \App\Models\UserMapel::create([
                    'guru_id' => $createdUser->id,
                    'mapel_id' => 1,
                ]);

                \App\Models\UserKelas::create([
                    'guru_id' => $createdUser->id,
                    'kelas_id' => 1,
                ]);
            }

            if ($user['role'] === RoleType::SISWA) {
                \App\Models\UserDetail::create([
                    'user_id' => $createdUser->id,
                    'no_absen' => 1,
                    'kelas_id' => 1,
                ]);
            }
        }
    }
}
