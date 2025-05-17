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
                'judul' => 'Judul Materi Progli',
                'deskripsi' => 'Deskripsi Materi Progli',
                'file_materi' => 'materi_progli.pdf',
                'file_modul' => 'modul_progli.pdf',
                'video_materi' => 'video_progli.mp4',
                'kelas_id' => 1,
                'mapel_id' => 1,
            ],
            [
                'judul' => 'Judul Materi IND',
                'deskripsi' => 'Deskripsi Materi BINDO',
                'file_materi' => 'materi_bindo.pdf',
                'file_modul' => 'modul_bindo.pdf',
                'video_materi' => 'video_bindo.mp4',
                'kelas_id' => 1,
                'mapel_id' => 2,
            ],
            [
                'judul' => 'Judul Materi ING',
                'deskripsi' => 'Deskripsi Materi ING',
                'file_materi' => 'materi_ing.pdf',
                'file_modul' => 'modul_ing.pdf',
                'video_materi' => 'video_ing.mp4',
                'kelas_id' => 3,
                'mapel_id' => 3,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Materi::create($data);
        }
    }
}
