<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KuisSoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataSoals = [
            [
                'kuis_id' => 1,
                'soal' => 'Apa itu Laravel?',
                'lampiran' => null,
                'jawaban' => 'A',
                'urutan' => 1,
                'poin' => 10
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Apa itu PHP?',
                'lampiran' => null,
                'jawaban' => 'A',
                'urutan' => 2,
                'poin' => 10
            ],
            [
                'kuis_id' => 1,
                'soal' => 'Apa itu MySQL?',
                'lampiran' => null,
                'jawaban' => 'C',
                'urutan' => 3,
                'poin' => 10
            ]
        ];

        $dataOpsis = [
            [
                'kuis_soal_id' => 1,
                'opsi' => 'Framework PHP',
                'label' => 'A'
            ],
            [
                'kuis_soal_id' => 1,
                'opsi' => 'Bahasa Pemrograman',
                'label' => 'B'
            ],
            [
                'kuis_soal_id' => 1,
                'opsi' => 'Database',
                'label' => 'C'
            ],
            [
                'kuis_soal_id' => 1,
                'opsi' => 'Sistem Operasi',
                'label' => 'D'
            ],
            [
                'kuis_soal_id' => 1,
                'opsi' => 'Framework Java',
                'label' => 'E'
            ],
            [
                'kuis_soal_id' => 2,
                'opsi' => 'Bahasa Pemrograman',
                'label' => 'A'
            ],
            [
                'kuis_soal_id' => 2,
                'opsi' => 'Framework PHP',
                'label' => 'B'
            ],
            [
                'kuis_soal_id' => 2,
                'opsi' => 'Database',
                'label' => 'C'
            ],
            [
                'kuis_soal_id' => 2,
                'opsi' => 'Sistem Operasi',
                'label' => 'D'
            ],
            [
                'kuis_soal_id' => 2,
                'opsi' => 'Framework Java',
                'label' => 'E'
            ],
            [
                'kuis_soal_id' => 3,
                'opsi' => 'Bahasa Pemrograman',
                'label' => 'A'
            ],
            [
                'kuis_soal_id' => 3,
                'opsi' => 'Framework PHP',
                'label' => 'B'
            ],
            [
                'kuis_soal_id' => 3,
                'opsi' => 'Database',
                'label' => 'C'
            ],
            [
                'kuis_soal_id' => 3,
                'opsi' => 'Sistem Operasi',
                'label' => 'D'
            ],
            [
                'kuis_soal_id' => 3,
                'opsi' => 'Framework Java',
                'label' => 'E'
            ]
        ];

        foreach ($dataSoals as $dataSoal) {
            \App\Models\KuisSoal::create($dataSoal);
        }

        foreach ($dataOpsis as $dataOpsi) {
            \App\Models\KuisOpsi::create($dataOpsi);
        }
    }
}
