import Card from '@/components/ui/card';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { stripHtml } from '@/lib/helper';
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
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="flex justify-between pr-4">
                                        Diupload <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Status <span>:</span>
                                    </p>
                                </div>
                                <div>
                                    <p>{materi.created_at}</p>
                                    <span>
                                        {materi.is_read ? (
                                            <LabelStatus status="Dipelajari" variant="success" size="small" />
                                        ) : (
                                            <LabelStatus status="Belum Dipelajari" variant="warning" size="small" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </AuthLayout>
    );
}
