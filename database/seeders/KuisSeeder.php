<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KuisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'judul' => 'Kuis Evaluasi Pemrograman Web & Laravel 11',
                'durasi' => 45,
                'tanggal_mulai' => '2026-01-01 08:00:00',
                'tanggal_selesai' => '2026-12-31 23:59:59',
                'materi_id' => 1,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Kuis::create($data);
        }
    }
}
