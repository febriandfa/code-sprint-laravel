import React from 'react';

export type UserRole = 'siswa' | 'guru' | 'admin';

export interface Auth {
    user: User;
}

export type Kelas = {
    id: number;
    nama: string;
    guru_id: string;
    wali_kelas: string;
    created_at?: string;
    updated_at?: string;
};

export type Mapel = {
    id: number;
    nama: string;
    deskripsi: string;
    semester: 'ganjil' | 'genap';
    tahun_ajaran: string;
    created_at: string;
    updated_at: string;
};

export type Materi = {
    id: number;
    kelas_id: string;
    kelas: string;
    mapel_id: string;
    mapel: string;
    judul: string;
    deskripsi: string;
    file_materi: string;
    file_modul: string;
    created_at: string;
    updated_at: string;
};

export type Kuis = {
    id: number;
    materi_id: string;
    materi: string;
    judul: string;
    durasi: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    total_soal: number;
    is_completed?: boolean;
    total_poin?: number;
    created_at: string;
    updated_at: string;
};

export type KuisSoal = {
    id: number;
    kuis_id: string;
    soal: string;
    lampiran: string;
    opsis: { label: string; opsi: string }[];
    jawaban: 'A' | 'B' | 'C' | 'D' | 'E';
    urutan: number;
    poin: number;
    created_at: string;
    updated_at: string;
};

export type KuisJawaban = {
    id: number;
    kuis_id: string;
    user_id: string;
    kuis_soal_id: number;
    jawaban: 'A' | 'B' | 'C' | 'D' | 'E';
    is_benar: boolean;
    poin: number;
    created_at: string;
    updated_at: string;
};

export type HasilKuis = {
    id: number;
    user_id: string;
    kuis_id: string;
    kuis: Kuis;
    nama_siswa: string;
    total_poin: number;
    created_at: string;
    updated_at: string;
};

export type Proyek = {
    id: number;
    kelas_id: string;
    kelas: string;
    mapel_id: string;
    mapel: string;
    nama: string;
    deskripsi: string;
    tenggat: string;
    is_completed?: boolean;
    is_processed?: boolean;
    nilai?: number;
    status: 'belum' | 'berjalan' | 'selesai';
};

export type Kelompok = {
    id: number;
    proyek_id: string;
    nama: string;
    jumlah_anggota: number;
    ketua_id: string;
    ketua: string;
    masalah: string;
    anggotas: KelompokAnggota[];
    is_full?: boolean;
    created_at: string;
    updated_at: string;
};

export type KelompokAnggota = {
    id: number;
    kelompok_id: string;
    anggota_id: string;
    nama_anggota: string;
    no_absen: number;
    status: 'ketua' | 'anggota';
    created_at: string;
    updated_at: string;
};

export type JoinedKelompok = {
    id: number;
    anggota_id: string;
    kelompok_id: string;
    status: 'ketua' | 'anggota';
    created_at: string;
    updated_at: string;
};

export type ProyekAnswerStatus = 'diterima' | 'ditolak' | 'direvisi' | 'diproses';

export type ProyekJawaban = {
    id: number;
    proyek_id: number;
    kelompok_id: number;
    user_id?: number;

    jawaban_tahap_1?: string;
    feedback_tahap_1?: string;
    status_tahap_1?: ProyekAnswerStatus;

    jawaban_tahap_2?: string;
    feedback_tahap_2?: string;
    status_tahap_2?: ProyekAnswerStatus;

    jawaban_tahap_3?: string;
    feedback_tahap_3?: string;
    status_tahap_3?: ProyekAnswerStatus;

    jawaban_tahap_4?: string;
    feedback_tahap_4?: string;
    status_tahap_4?: ProyekAnswerStatus;

    jawaban_tahap_5?: string;
    feedback_tahap_5?: string;
    status_tahap_5?: ProyekAnswerStatus;

    jawaban_tahap_6?: string;
    feedback_tahap_6?: string;
    status_tahap_6?: ProyekAnswerStatus;

    jawaban_tahap_7?: string;
    feedback_tahap_7?: string;
    status_tahap_7?: ProyekAnswerStatus;

    jawaban_tahap_8?: string;
    feedback_tahap_8?: string;
    status_tahap_8?: ProyekAnswerStatus;

    file_proyek?: string;
    file_laporan?: string;

    created_at?: string;
    updated_at?: string;
};

export interface BreadcrumbItem {
    title: string;
    link: string;
}

export interface OptionItem {
    value: string | number;
    label: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
}

export interface InputFieldProps extends React.ComponentPropsWithRef<'input'> {
    id: string;
    label: string;
    error?: string;
    type?: 'email' | 'text' | 'password' | 'file' | 'number' | 'date' | 'datetime-local';
}

export interface SelectProps {
    id: string;
    label: string;
    error?: string;
    options?: { value: string; label: string }[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'guru' | 'siswa';
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    user_detail?: {
        kelas?: Kelas;
    };
    [key: string]: unknown;
}

export interface UserDetail extends User {
    no_absen?: number;
    kelas_id: string;
    kelas: string;
}

export interface GuruDetail extends User {
    kelases: {
        id: number;
        kelas_id: string;
        nama: string;
    }[];
    mapels: {
        id: number;
        mapel_id: string;
        nama: string;
    }[];
}
