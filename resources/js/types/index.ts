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
    created_at: string;
    updated_at: string;
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

export interface BreadcrumbItem {
    title: string;
    link: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
}

export interface InputFieldProps extends InputProps {
    type?: 'email' | 'text' | 'password';
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
