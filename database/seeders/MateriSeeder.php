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
                'judul' => 'Materi DKV MTK',
                'deskripsi' => 'Deskripsi Materi DKV MTK',
                'file_materi' => 'materi_dkv_mtk.pdf',
                'file_modul' => 'modul_dkv_mtk.pdf',
                'video_materi' => 'video_dkv_mtk.mp4',
                'kelas_id' => 1,
                'mapel_id' => 1,
            ],
            [
                'judul' => 'Materi DKV BINDO',
                'deskripsi' => 'Deskripsi Materi DKV BINDO',
                'file_materi' => 'materi_dkv_bindo.pdf',
                'file_modul' => 'modul_dkv_bindo.pdf',
                'video_materi' => 'video_dkv_bindo.mp4',
                'kelas_id' => 1,
                'mapel_id' => 2,
            ],
            [
                'judul' => 'Materi RPL BINDO',
                'deskripsi' => 'Deskripsi Materi RPL BINDO',
                'file_materi' => 'materi_rpl_bindo.pdf',
                'file_modul' => 'modul_rpl_bindo.pdf',
                'video_materi' => 'video_rpl_bindo.mp4',
                'kelas_id' => 2,
                'mapel_id' => 2,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Materi::create($data);
        }
    }
}
