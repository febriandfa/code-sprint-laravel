<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MateriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'judul' => 'Materi 1',
                'deskripsi' => 'Deskripsi Materi 1',
                'file_materi' => 'materi1.pdf',
                'file_modul' => 'modul1.pdf',
                'video_materi' => 'video1.mp4',
                'kelas_id' => 1,
                'mapel_id' => 1,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Materi::create($data);
        }
    }
}
