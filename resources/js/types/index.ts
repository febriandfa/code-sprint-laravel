import { LucideIcon } from 'lucide-react';
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
    status: 'belum' | 'proses' | 'selesai';
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

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'guru' | 'siswa';
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
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
