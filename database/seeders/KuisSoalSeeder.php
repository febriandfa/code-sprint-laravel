<?php

namespace Database\Seeders;

use App\Models\KuisOpsi;
use App\Models\KuisSoal;

class KuisSoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $soals = [
            [
                'kuis_id' => 1,
                'soal' => 'Apa peran komponen Model dalam arsitektur Model-View-Controller (MVC) pada Laravel?',
                'lampiran' => null,
                'jawaban' => 'B',
                'urutan' => 1,
                'poin' => 20,
                'opsis' => [
                    ['label' => 'A', 'opsi' => 'Menangani tampilan antarmuka (UI) pengguna.'],
                    ['label' => 'B', 'opsi' => 'Mengelola data, aturan bisnis, dan interaksi dengan database.'],
                    ['label' => 'C', 'opsi' => 'Menerima HTTP Request dan mengirimkan HTTP Response.'],
                    ['label' => 'D', 'opsi' => 'Mengatur jalur URL dan routing pada file routes/web.php.'],
                    ['label' => 'E', 'opsi' => 'Menjalankan proses kompilasi asset CSS dan JavaScript.'],
                ]
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Command Artisan apa yang digunakan untuk membuat Controller baru beserta fungsi Resource (CRUD) di Laravel?',
                'lampiran' => null,
                'jawaban' => 'A',
                'urutan' => 2,
                'poin' => 20,
                'opsis' => [
                    ['label' => 'A', 'opsi' => 'php artisan make:controller ProductController --resource'],
                    ['label' => 'B', 'opsi' => 'php artisan create:controller ProductController --crud'],
                    ['label' => 'C', 'opsi' => 'php artisan generate:controller ProductController'],
                    ['label' => 'D', 'opsi' => 'php artisan make:model ProductController -r'],
                    ['label' => 'E', 'opsi' => 'php artisan build:controller ProductController'],
                ]
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Fitur Eloquent ORM di Laravel yang digunakan untuk mendefinisikan relasi One-to-Many adalah...',
                'lampiran' => null,
                'jawaban' => 'C',
                'urutan' => 3,
                'poin' => 20,
                'opsis' => [
                    ['label' => 'A', 'opsi' => 'belongsToMany()'],
                    ['label' => 'B', 'opsi' => 'hasOne()'],
                    ['label' => 'C', 'opsi' => 'hasMany()'],
                    ['label' => 'D', 'opsi' => 'belongsTo()'],
                    ['label' => 'E', 'opsi' => 'morphTo()'],
                ]
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Dalam arsitektur RESTful API, metode HTTP yang digunakan khusus untuk memperbarui data secara parsial adalah...',
                'lampiran' => null,
                'jawaban' => 'D',
                'urutan' => 4,
                'poin' => 20,
                'opsis' => [
                    ['label' => 'A', 'opsi' => 'GET'],
                    ['label' => 'B', 'opsi' => 'POST'],
                    ['label' => 'C', 'opsi' => 'DELETE'],
                    ['label' => 'D', 'opsi' => 'PATCH'],
                    ['label' => 'E', 'opsi' => 'OPTION'],
                ]
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Direktori utama di Laravel 11 tempat mendefinisikan skema tabel database melalui Migration berada pada...',
                'lampiran' => null,
                'jawaban' => 'E',
                'urutan' => 5,
                'poin' => 20,
                'opsis' => [
                    ['label' => 'A', 'opsi' => 'app/Models'],
                    ['label' => 'B', 'opsi' => 'config/database.php'],
                    ['label' => 'C', 'opsi' => 'resources/views'],
                    ['label' => 'D', 'opsi' => 'storage/framework'],
                    ['label' => 'E', 'opsi' => 'database/migrations'],
                ]
            ],
        ];

        foreach ($soals as $item) {
            $opsis = $item['opsis'];
            unset($item['opsis']);

            $createdSoal = KuisSoal::create($item);

            foreach ($opsis as $opsi) {
                KuisOpsi::create([
                    'kuis_soal_id' => $createdSoal->id,
                    'opsi' => $opsi['opsi'],
                    'label' => $opsi['label'],
                ]);
            }
        }
    }
}
