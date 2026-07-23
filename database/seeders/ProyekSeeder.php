<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProyekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'nama' => 'Proyek  RPL-Progli',
                'deskripsi' => 'Deskripsi Proyek Materi RPL-Progli',
                'tenggat' => '2025-03-03 08:00:00',
                // 'kelas_id' => 1,
                // 'mapel_id' => 1,
                'materi_id' => 1,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Proyek::create($data);
        }
    }
}
