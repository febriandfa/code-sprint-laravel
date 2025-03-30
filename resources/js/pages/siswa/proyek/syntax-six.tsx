import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SyntaxSixProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <div className="flex justify-end">
                    <Button>Selesai</Button>
                </div>
            </div>
        </AuthLayout>
    );
}
