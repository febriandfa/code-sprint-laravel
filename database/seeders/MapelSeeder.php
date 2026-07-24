<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'nama' => 'Pemrograman Web dan Perangkat Bergerak',
                'deskripsi' => 'Pengembangan aplikasi web berbasis Laravel dan API untuk perangkat bergerak.',
                'semester' => 'ganjil',
                'tahun_ajaran' => '2024/2025',
            ],
            [
                'nama' => 'Pemrograman Berbasis Objek',
                'deskripsi' => 'Konsep Object-Oriented Programming (OOP) dan perancangan perangkat lunak.',
                'semester' => 'ganjil',
                'tahun_ajaran' => '2024/2025',
            ],
            [
                'nama' => 'Basis Data & Desain Sistem',
                'deskripsi' => 'Perancangan ERD, normalisasi, dan implementasi MySQL database.',
                'semester' => 'genap',
                'tahun_ajaran' => '2024/2025',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\Mapel::create($data);
        }
    }
}
