import CardMateri from '@/components/card-materi';
import AuthLayout from '@/layouts/auth-layout';
import { Materi } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexMateri() {
    const { materis } = usePage().props as { materis?: Materi[] };

    return (
        <AuthLayout title="Materi" index siswa>
            <div className="grid grid-cols-3 gap-5">
                {materis?.map((materi, index) => {
                    return (
                        <CardMateri
                            key={index}
                            materiId={materi.id}
                            title={materi.judul}
                            description={materi.deskripsi}
                            mapel={materi.mapel}
                            createdAt={materi.created_at}
                            isRead={materi.is_read ?? false}
                        />
                    );
                })}
            </div>
        </AuthLayout>
    );
}
