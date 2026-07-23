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
                'nama' => 'Progli',
                'deskripsi' => 'Pelajaran Progli',
                'semester' => 'ganjil',
                'tahun_ajaran' => '2021/2022',
            ],
            [
                'nama' => 'Bahasa Indonesia',
                'deskripsi' => 'Pelajaran Bahasa Indonesia',
                'semester' => 'genap',
                'tahun_ajaran' => '2021/2022',
            ],
            [
                'nama' => 'Bahasa Inggris',
                'deskripsi' => 'Pelajaran Bahasa Inggris',
                'semester' => 'ganjil',
                'tahun_ajaran' => '2021/2022',
            ],

        ];

        foreach ($datas as $data) {
            \App\Models\Mapel::create($data);
        }
    }
}
