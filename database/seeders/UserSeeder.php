<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator System',
                'email' => 'admin@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::ADMIN,
            ],
            [
                'name' => 'Budi Santoso, S.Kom. (Guru PWPB)',
                'email' => 'guru.budi@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::GURU,
                'mapel_ids' => [1],
                'kelas_ids' => [1, 2, 3],
            ],
            [
                'name' => 'Siti Rahmawati, M.T. (Guru PBO)',
                'email' => 'guru.siti@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::GURU,
                'mapel_ids' => [2, 3],
                'kelas_ids' => [1, 3],
            ],
            [
                'name' => 'Andi Pratama',
                'email' => 'siswa.andi@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
                'no_absen' => 1,
            ],
            [
                'name' => 'Bambang Wijaya',
                'email' => 'siswa.bambang@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
                'no_absen' => 2,
            ],
            [
                'name' => 'Citra Lestari',
                'email' => 'siswa.citra@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
                'no_absen' => 3,
            ],
            [
                'name' => 'Dewi Anggraini',
                'email' => 'siswa.dewi@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
                'no_absen' => 4,
            ],
            [
                'name' => 'Eko Prasetyo',
                'email' => 'siswa.eko@codesprint.com',
                'password' => bcrypt('password123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 2,
                'no_absen' => 1,
            ],
        ];

        foreach ($users as $user) {
            $createdUser = \App\Models\User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => $user['password'],
                'role' => $user['role'],
            ]);
            $createdUser->assignRole($user['role']);

            if ($user['role'] === RoleType::GURU) {
                foreach ($user['mapel_ids'] as $mapelId) {
                    \App\Models\UserMapel::create([
                        'guru_id' => $createdUser->id,
                        'mapel_id' => $mapelId,
                    ]);
                }

                foreach ($user['kelas_ids'] as $kelasId) {
                    \App\Models\UserKelas::create([
                        'guru_id' => $createdUser->id,
                        'kelas_id' => $kelasId,
                    ]);
                }
            }

            if ($user['role'] === RoleType::SISWA) {
                \App\Models\UserDetail::create([
                    'user_id' => $createdUser->id,
                    'no_absen' => $user['no_absen'],
                    'kelas_id' => $user['kelas_id'],
                ]);
            }
        }
    }
}
