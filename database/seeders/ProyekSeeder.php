<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Enums\ProyekStatus;

class ProyekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'nama' => 'Pengembangan Aplikasi Web E-Commerce UMKM Lokal',
                'deskripsi' => 'Proyek PjBL merancang dan membangun aplikasi web E-Commerce UMKM lokal berbasis Laravel 11. Siswa dibagi ke dalam kelompok untuk menyelesaikan 8 sintaks pengerjaan PjBL.',
                'tenggat' => '2026-12-31 23:59:59',
                'status' => ProyekStatus::BERJALAN,
                'materi_id' => 1,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Proyek::create($data);
        }
    }
}
