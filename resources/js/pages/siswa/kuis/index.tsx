import CardKuis from '@/components/card-kuis';
import NoData from '@/components/no-data';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexKuis() {
    const { kuises } = usePage().props as { kuises?: Kuis[] };

    console.log('kuis siswa', kuises);

    return (
        <AuthLayout title="Kuis" index siswa>
            {kuises?.length ? (
                <div className="grid grid-cols-3 gap-5">
                    {kuises?.map((kuis, index) => {
                        const isCompleted = Boolean(kuis.is_completed);
                        return (
                            <CardKuis
                                key={index}
                                kuisId={kuis.id}
                                title={kuis.judul}
                                totalSoal={kuis.total_soal}
                                totalPoin={kuis.total_poin ?? '-'}
                                duration={kuis.durasi}
                                isCompleted={isCompleted ?? false}
                                startDate={kuis.tanggal_mulai}
                                endDate={kuis.tanggal_selesai}
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
