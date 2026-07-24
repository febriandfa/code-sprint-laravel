<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelompokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataKelompoks = [
            [
                'nama' => 'Kelompok Web Craftsmen',
                'jumlah_anggota' => 2,
                'masalah' => 'Pengrajin batik lokal kesulitan memasarkan produk secara online dan membutuhkan platform E-Commerce katalog interaktif.',
                'proyek_id' => 1,
            ],
            [
                'nama' => 'Kelompok Code Ninjas',
                'jumlah_anggota' => 2,
                'masalah' => 'Toko kelontong daerah membutuhkan sistem e-commerce sederhana dengan integrasi pesan otomatis ke WhatsApp.',
                'proyek_id' => 1,
            ],
        ];

        $dataAnggotas = [
            [
                'kelompok_id' => 1,
                'anggota_id' => 4, // Andi Pratama
                'status' => 'ketua',
            ],
            [
                'kelompok_id' => 1,
                'anggota_id' => 5, // Bambang Wijaya
                'status' => 'anggota',
            ],
            [
                'kelompok_id' => 2,
                'anggota_id' => 6, // Citra Lestari
                'status' => 'ketua',
            ],
            [
                'kelompok_id' => 2,
                'anggota_id' => 7, // Dewi Anggraini
                'status' => 'anggota',
            ],
        ];

        foreach ($dataKelompoks as $kelompok) {
            \App\Models\Kelompok::create($kelompok);
        }

        foreach ($dataAnggotas as $anggota) {
            \App\Models\KelompokAnggota::create($anggota);
        }
    }
}
