import Card from '@/components/ui/card';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexKuis() {
    const { kuises } = usePage().props as { kuises?: Kuis[] };

    return (
        <AuthLayout title="Kuis" index siswa>
            <div className="grid grid-cols-3 gap-5">
                {kuises?.map((kuis, index) => {
                    return (
                        <Card
                            key={index}
                            title={kuis.judul}
                            content="kuis"
                            routeShow={route('siswa.kuis.show', kuis.id)}
                            disabled={kuis.is_completed}
                            isKuis
                        >
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="flex justify-between pr-4">
                                        Soal <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Waktu <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Nilai <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Status <span>:</span>
                                    </p>
                                </div>
                                <div>
                                    <p>{kuis.total_soal}</p>
                                    <p>{kuis.durasi} Menit</p>
                                    <p>{kuis.total_poin ?? '-'}</p>
                                    <span>
                                        {kuis.is_completed ? (
                                            <LabelStatus status="Selesai" variant="success" size="small" />
                                        ) : (
                                            <LabelStatus status="Belum Dikerjakan" variant="warning" size="small" />
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
