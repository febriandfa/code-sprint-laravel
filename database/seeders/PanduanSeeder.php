<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PanduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'judul' => 'Panduan Penggunaan Sistem - Admin',
                'file' => 'panduan_admin.pdf',
                'role' => 'admin',
            ],
            [
                'judul' => 'Panduan Manajemen Kelas & PjBL - Guru',
                'file' => 'panduan_guru.pdf',
                'role' => 'guru',
            ],
            [
                'judul' => 'Panduan Pengerjaan Proyek PjBL - Siswa',
                'file' => 'panduan_siswa.pdf',
                'role' => 'siswa',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\Panduan::create($data);
        }
    }
}
