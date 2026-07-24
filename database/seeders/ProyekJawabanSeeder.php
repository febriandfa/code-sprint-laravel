<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Enums\ProyekAnswerStatus;

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
                'user_id' => 4, // Andi Pratama (Ketua Kelompok 1)
                'jawaban_tahap_1' => 'Masalah utama pengrajin batik lokal adalah keterbatasan jangkauan pemasaran dan pencatatan inventaris kain batik yang masih manual.',
                'feedback_tahap_1' => 'Identifikasi masalah sangat baik dan relevan dengan kondisi lapangan.',
                'status_tahap_1' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_2' => 'Kelompok menyepakati solusi berupa Web E-Commerce berbasis Laravel dengan fitur Katalog Batik, Filter Motif, dan Checkout Order Direct WA.',
                'feedback_tahap_2' => 'Solusi yang ditawarkan realistis untuk diselesaikan dalam durasi PjBL.',
                'status_tahap_2' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_3' => 'Perencanaan Arsitektur: Database MySQL (Tabel users, batik, orders), Framework Laravel 11, UI Blade & TailwindCSS.',
                'feedback_tahap_3' => 'Desain arsitektur sistem komprehensif dan rapi.',
                'status_tahap_3' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_4' => 'proposal_web_craftsmen.pdf',
                'feedback_tahap_4' => 'Proposal disetujui. Silakan lanjut ke tahap penjadwalan kerja.',
                'status_tahap_4' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_5' => 'Perancangan Wireframe UI dan Schema ERD Database telah diselesaikan di Figma dan MySQL Workbench.',
                'feedback_tahap_5' => 'ERD sudah menampung semua kebutuhan fitur utama.',
                'status_tahap_5' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_6' => 'jadwal_pengerjaan_web_craftsmen.xlsx',
                'feedback_tahap_6' => 'Pembagian tugas antar anggota kelompok seimbang dan jelas.',
                'status_tahap_6' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_7' => 'Implementasi fitur autentikasi, katalog produk batik, dan cart selesai 100% serta lolos pengujian internal.',
                'feedback_tahap_7' => 'Fitur berjalan lancar tanpa bug kritis.',
                'status_tahap_7' => ProyekAnswerStatus::TERIMA,

                'file_proyek' => 'source_code_ecommerce_batik.zip',
                'file_laporan' => 'laporan_akhir_pjbl_batik.pdf',
                'feedback_tahap_8' => 'Sangat memuaskan! Hasil karya E-Commerce Batik siap dipublikasikan.',
                'status_tahap_8' => ProyekAnswerStatus::TERIMA,
                'refleksi' => 'Melalui pengerjaan PjBL ini, kelompok kami mempelajari arsitektur Laravel 11, manajemen waktu, dan kerja sama tim yang solid.',
            ],
            [
                'proyek_id' => 1,
                'kelompok_id' => 2,
                'user_id' => 6, // Citra Lestari (Ketua Kelompok 2)
                'jawaban_tahap_1' => 'Toko kelontong daerah memerlukan sistem katalog digital sederhana yang dapat diakses pembeli via HP.',
                'feedback_tahap_1' => 'Identifikasi masalah cukup baik.',
                'status_tahap_1' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_2' => 'Mengembangkan aplikasi web katalog toko kelontong dengan tombol pemesanan WhatsApp otomatis.',
                'feedback_tahap_2' => 'Solusi disetujui.',
                'status_tahap_2' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_3' => 'Menggunakan Laravel 11, MySQL, dan UI Bootstrap 5.',
                'feedback_tahap_3' => 'Perencanaan baik, lanjutkan pengerjaan.',
                'status_tahap_3' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_4' => 'proposal_code_ninjas.pdf',
                'feedback_tahap_4' => 'Proposal diterima.',
                'status_tahap_4' => ProyekAnswerStatus::TERIMA,

                'jawaban_tahap_5' => 'Pengembangan fitur katalog sedang dalam tahap koding controller.',
                'feedback_tahap_5' => 'Segera selesaikan pengerjaan fitur utama.',
                'status_tahap_5' => ProyekAnswerStatus::PROSES,
            ]
        ];

        foreach ($datas as $data) {
            \App\Models\ProyekJawaban::create($data);
        }
    }
}
