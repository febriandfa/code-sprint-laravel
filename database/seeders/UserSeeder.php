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
                'name' => 'Siswa DKV Ketua 1',
                'email' => 'siswa1@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Siswa DKV Anggota 1',
                'email' => 'siswa2@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Siswa DKV Ketua 2',
                'email' => 'siswa3@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Siswa DKV Anggota 2',
                'email' => 'siswa4@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Siswa RPL',
                'email' => 'siswa5@csprint.com',
                'password' => bcrypt('siswa123'),
                'role' => RoleType::SISWA,
                'kelas_id' => 2,
            ],
            [
                'name' => 'Guru DKV MTK',
                'email' => 'guru1@csprint.com',
                'password' => bcrypt('guru123'),
                'role' => RoleType::GURU,
                'mapel_id' => 1,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Guru DKV BINDO',
                'email' => 'guru2@csprint.com',
                'password' => bcrypt('guru123'),
                'role' => RoleType::GURU,
                'mapel_id' => 2,
                'kelas_id' => 1,
            ],
            [
                'name' => 'Guru RPL BINDO',
                'email' => 'guru3@csprint.com',
                'password' => bcrypt('guru123'),
                'role' => RoleType::GURU,
                'mapel_id' => 2,
                'kelas_id' => 2,
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@csprint.com',
                'password' => bcrypt('admin123'),
                'role' => RoleType::ADMIN,
            ]
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
                \App\Models\UserMapel::create([
                    'guru_id' => $createdUser->id,
                    'mapel_id' => $user['mapel_id'],
                ]);

                \App\Models\UserKelas::create([
                    'guru_id' => $createdUser->id,
                    'kelas_id' => $user['kelas_id'],
                ]);
            }

            if ($user['role'] === RoleType::SISWA) {
                \App\Models\UserDetail::create([
                    'user_id' => $createdUser->id,
                    'no_absen' => $this->userRepository->getUserCount(RoleType::SISWA, 1) + 1,
                    'kelas_id' => $user['kelas_id'],
                ]);
            }
        }
    }
}
