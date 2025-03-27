import Card from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { formatDate, stripHtml } from '@/lib/helper';
import { Materi } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexMateri() {
    const { materis } = usePage().props as { materis?: Materi[] };

    return (
        <AuthLayout title="Materi" index siswa>
            <div className="grid grid-cols-3 gap-5">
                {materis?.map((materi, index) => {
                    return (
                        <Card key={index} title={materi.judul} content="materi" routeShow={route('siswa.materi.show', materi.id)}>
                            <p className="line-clamp-3 text-justify">{stripHtml(materi.deskripsi)}</p>
                            <p>Diupload : {formatDate(materi.created_at)}</p>
                        </Card>
                    );
                })}
            </div>
        </AuthLayout>
    );
}
