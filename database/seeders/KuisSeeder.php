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
                'judul' => 'Kuis 1',
                'durasi' => 60,
                'tanggal_mulai' => '2025-03-01 08:00:00',
                'tanggal_selesai' => '2025-05-01 09:00:00',
                'materi_id' => 1,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Kuis::create($data);
        }
    }
}
