<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Enums\ProyekStatus;

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
                'anggota_id' => 4, // Andi Pratama
                'kegiatan' => 'Membuat Dokumen Proposal dan Perancangan ERD Database',
                'tenggat' => '2026-12-01 14:30:00',
                'status' => ProyekStatus::SELESAI,
                'file_kegiatan' => 'proposal_dan_erd_batik.pdf',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'anggota_id' => 5, // Bambang Wijaya
                'kegiatan' => 'Pembuatan UI Wireframe dan Slice Template Blade Laravel',
                'tenggat' => '2026-12-05 14:30:00',
                'status' => ProyekStatus::SELESAI,
                'file_kegiatan' => 'ui_design_batik.png',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 1,
                'anggota_id' => 4, // Andi Pratama
                'kegiatan' => 'Koding Controller & Eloquent Logic Checkout Order',
                'tenggat' => '2026-12-10 14:30:00',
                'status' => ProyekStatus::SELESAI,
                'file_kegiatan' => 'checkout_controller.zip',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 2,
                'anggota_id' => 6, // Citra Lestari
                'kegiatan' => 'Membuat Proposal dan Wireframe Toko Kelontong',
                'tenggat' => '2026-12-01 14:30:00',
                'status' => ProyekStatus::SELESAI,
                'file_kegiatan' => 'proposal_kelontong.pdf',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 2,
                'anggota_id' => 7, // Dewi Anggraini
                'kegiatan' => 'Pengembangan Form Katalog dan Tombol Order WhatsApp',
                'tenggat' => '2026-12-15 14:30:00',
                'status' => ProyekStatus::BERJALAN,
                'file_kegiatan' => null,
            ],
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekJadwal::create($data);
        }
    }
}
