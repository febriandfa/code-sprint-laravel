import Embed from '@/components/ui/embed';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Materi } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ShowMateri() {
    const { materi } = usePage().props as { materi?: Materi };

    const breadcrumbs = [
        { title: 'Materi', link: route('siswa.materi.index') },
        { title: materi?.judul ?? 'Detail Materi', link: '#' },
    ];

    return (
        <AuthLayout title={materi?.judul ?? 'Materi'} breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-4">
                <Subtitle subtitle="Deskripsi Materi" />
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: materi?.deskripsi || 'Tidak ada deskripsi' }} />
                <Embed src={materi?.file_materi} />
            </div>
        </AuthLayout>
    );
}
