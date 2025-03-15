import InputField from '@/components/input-field';
import Button from '@/components/ui/button';
import Embed from '@/components/ui/embed';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { Materi } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function ShowMateri() {
    const { materi } = usePage().props as { materi?: Materi };

    const breadcrumbs = [
        {
            title: 'Materi',
            link: route('guru.materi.index'),
        },
        {
            title: materi?.judul ?? 'Detail Materi',
            link: '#',
        },
    ];

    return (
        <AuthLayout title="Edit Materi" breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6">
                <InputField id="judul" label="Nama Mata Pelajaran" value={materi?.judul} disabled />
                <RichTextView label="Deskripsi" value={materi?.deskripsi} />
                <Embed label="File Materi" src={materi?.file_materi} />
                <Embed label="File Modul" src={materi?.file_modul} />
                <div className="mt-3 w-fit">
                    <Button className="w-full" onClick={() => router.visit(route('guru.materi.index'))}>
                        Kembali
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
