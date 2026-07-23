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
                'user_id' => 1,
                'nilai_orientasi_masalah' => 5,
                'nilai_kerja_sama' => 5,
                'nilai_proses' => 5,
                'nilai_waktu' => 5,
                'nilai_hasil_proyek' => 5,
                'nilai' => 100,
                'evaluasi' => 'Sangat baik',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekNilai::create($data);
        }
    }
}
