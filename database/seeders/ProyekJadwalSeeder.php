<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProyekJadwalSeeder extends Seeder
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
                'anggota_id' => 1,
                'kegiatan' => 'Membuat proposal proyek',
                'tenggat' => '2025-10-01 14:30:00',
                'status' => 'berjalan',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'anggota_id' => 2,
                'kegiatan' => 'Membuat flowchart proyek',
                'tenggat' => '2025-10-01 14:30:00',
                'status' => 'belum',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'anggota_id' => 2,
                'kegiatan' => 'Membuat infografik proyek',
                'tenggat' => '2025-10-01 14:30:00',
                'status' => 'selesai',
                'file_kegiatan' => 'infografik_proyek.pdf',
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekJadwal::create($data);
        }
    }
}
