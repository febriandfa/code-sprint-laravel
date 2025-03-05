<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'siswa',
                'guard_name' => 'web',
            ],
            [
                'name' => 'guru',
                'guard_name' => 'web',
            ],
            [
                'name' => 'admin',
                'guard_name' => 'web',
            ]
        ];

        foreach ($roles as $role) {
            \Spatie\Permission\Models\Role::create($role);
        }
    }
}
