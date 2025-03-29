import PjblHeader from '@/components/pjbl-header';
import AuthLayout from '@/layouts/auth-layout';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} />
        </AuthLayout>
    );
}
