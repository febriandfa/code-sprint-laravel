import CardProyek from '@/components/card-proyek';
import NoData from '@/components/no-data';
import AuthLayout from '@/layouts/auth-layout';
import { Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexProyek() {
    const { proyeks } = usePage().props as { proyeks?: Proyek[] };

    console.log('proyek siswa', proyeks);

    return (
        <AuthLayout title="Project Based Learning" index siswa>
            {proyeks?.length ? (
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
            ) : (
                <NoData />
            )}
        </AuthLayout>
    );
}
