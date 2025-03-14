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
                'nama' => 'XII RPL 1',
                'guru_id' => 2,
            ],
            [
                'nama' => 'XII RPL 2',
                'guru_id' => 2,
            ],
            [
                'nama' => 'XII RPL 3',
                'guru_id' => 2,
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\Kelas::create($data);
        }
    }
}
