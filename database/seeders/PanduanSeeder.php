<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PanduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'judul' => 'Panduan Admin',
                'role' => 'admin',
            ],
            [
                'judul' => 'Panduan Guru',
                'role' => 'guru',
            ],
            [
                'judul' => 'Panduan Siswa',
                'role' => 'siswa',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\Panduan::create($data);
        }
    }
}
