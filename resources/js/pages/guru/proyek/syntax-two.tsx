import PjblHeader from '@/components/pjbl-header';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SyntaxTwo() {
    const { currentSyntax, proyek, kelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} view />
        </AuthLayout>
    );
}
