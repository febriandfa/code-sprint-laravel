<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProyekNilaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'user_id' => 4, // Andi Pratama
                'nilai_orientasi_masalah' => 5,
                'nilai_kerja_sama' => 5,
                'nilai_proses' => 5,
                'nilai_waktu' => 4,
                'nilai_hasil_proyek' => 5,
                'nilai' => 96,
                'evaluasi' => 'Proyek dikembangkan dengan sangat terstruktur. Dokumentasi PjBL dan fitur E-Commerce batik berfungsi sempurna.',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'user_id' => 5, // Bambang Wijaya
                'nilai_orientasi_masalah' => 5,
                'nilai_kerja_sama' => 5,
                'nilai_proses' => 4,
                'nilai_waktu' => 4,
                'nilai_hasil_proyek' => 5,
                'nilai' => 92,
                'evaluasi' => 'Kreativitas desain antarmuka UI sangat menarik, responsif, dan konsisten.',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekNilai::create($data);
        }
    }
}
