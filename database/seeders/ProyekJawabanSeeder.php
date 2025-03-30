<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProyekJawabanSeeder extends Seeder
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
                'jawaban_tahap_2' => 'Ini adalah jawaban tahap 2',
                'feedback_tahap_2' => 'Ini adalah feedback tahap 2',
                'status_tahap_2' => 'diterima',
                'jawaban_tahap_3' => 'Ini adalah jawaban tahap 3',
                'feedback_tahap_3' => 'Ini adalah feedback tahap 3',
                'status_tahap_3' => 'diterima',
                'jawaban_tahap_4' => 'jawaban_tahap_4.pdf',
                'feedback_tahap_4' => 'Ini adalah feedback tahap 4',
                'status_tahap_4' => 'diterima',
                'jawaban_tahap_5' => 'Ini adalah jawaban tahap 5',
                'feedback_tahap_5' => 'Ini adalah feedback tahap 5',
                'status_tahap_5' => 'diterima',
                'jawaban_tahap_6' => 'jawaban_tahap_4.xlsx',
                'feedback_tahap_6' => 'Ini adalah feedback tahap 6',
                'status_tahap_6' => 'diterima',
                'feedback_tahap_7' => 'Ini adalah feedback tahap 7',
                'status_tahap_7' => 'diterima',
                'file_proyek' => 'file_proyek.zip',
                'file_laporan' => 'file_laporan.pdf',
                'feedback_tahap_8' => 'Ini adalah feedback tahap 8',
                'status_tahap_8' => 'diterima',
                'refleksi' => 'Ini adalah refleksi',
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekJawaban::create($data);
        }
    }
}
