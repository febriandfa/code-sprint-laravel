<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'nama' => 'XII DKV 1',
            ],
            [
                'nama' => 'XII RPL 1',
            ],
            [
                'nama' => 'XII TKJ 3',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\Kelas::create($data);
        }
    }
}
