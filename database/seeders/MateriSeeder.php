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
                'judul' => 'Modul PjBL 1: Arsitektur Model-View-Controller (MVC) Laravel 11',
                'deskripsi' => 'Pembahasan mendalam struktur direktori Laravel 11, routing, controller, Blade templating, dan pembuatan sistem CRUD modern.',
                'file_materi' => 'modul_laravel_mvc.pdf',
                'file_modul' => 'panduan_pjbl_laravel.pdf',
                'video_materi' => 'video_laravel_mvc.mp4',
                'kelas_id' => 1,
                'mapel_id' => 1,
            ],
            [
                'judul' => 'Modul PjBL 2: Pembuatan RESTful API & Autentikasi Laravel Sanctum',
                'deskripsi' => 'Membuat Endpoint API (GET, POST, PUT, DELETE), JSON Response, API Resources, dan autentikasi token.',
                'file_materi' => 'modul_restful_api.pdf',
                'file_modul' => 'lab_sheet_api.pdf',
                'video_materi' => 'video_rest_api.mp4',
                'kelas_id' => 1,
                'mapel_id' => 1,
            ],
            [
                'judul' => 'Modul PjBL 3: Perancangan Database Relasional & Eloquent ORM',
                'deskripsi' => 'Mendesain ERD, skema migrasi Laravel, relasi One-to-Many, Many-to-Many, serta query Eloquent ORM.',
                'file_materi' => 'modul_database_eloquent.pdf',
                'file_modul' => 'lab_sheet_database.pdf',
                'video_materi' => 'video_database.mp4',
                'kelas_id' => 1,
                'mapel_id' => 3,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\Materi::create($data);
        }
    }
}
