import CardProyek from '@/components/card-proyek';
import AuthLayout from '@/layouts/auth-layout';
import { Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexProyek() {
    const { proyeks } = usePage().props as { proyeks?: Proyek[] };

    return (
        <AuthLayout title="Project Based Learning" index siswa>
            <div className="grid grid-cols-3 gap-5">
                {proyeks?.map((proyek, index) => {
                    return (
                        <CardProyek
                            key={index}
                            proyekId={proyek.id}
                            title={proyek.nama}
                            deadline={proyek.tenggat}
                            score={proyek.nilai ?? '-'}
                            isCompleted={proyek.is_completed ?? false}
                            isProcessed={proyek.is_processed ?? false}
                        />
                    );
                })}
            </div>
        </AuthLayout>
    );
}
