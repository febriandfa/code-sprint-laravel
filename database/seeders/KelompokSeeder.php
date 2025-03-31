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
                'nama' => 'Javascript',
                'jumlah_anggota' => 2,
                'masalah' => 'Lonjakan pengguna aplikasi',
                'proyek_id' => 1,
            ],
            [
                'nama' => 'Laravel',
                'jumlah_anggota' => 3,
                'masalah' => 'Error pada aplikasi',
                'proyek_id' => 1,
            ],
        ];

        $dataAnggotas = [
            [
                'kelompok_id' => 1,
                'anggota_id' => 1,
                'status' => 'ketua',
            ],
            [
                'kelompok_id' => 1,
                'anggota_id' => 2,
                'status' => 'anggota',
            ],
            [
                'kelompok_id' => 2,
                'anggota_id' => 3,
                'status' => 'ketua',
            ],
            [
                'kelompok_id' => 2,
                'anggota_id' => 4,
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
