import Card from '@/components/ui/card';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { formatDate } from '@/lib/helper';
import { Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexProyek() {
    const { proyeks } = usePage().props as { proyeks?: Proyek[] };

    return (
        <AuthLayout title="Project Based Learning" index siswa>
            <div className="grid grid-cols-3 gap-5">
                {proyeks?.map((proyek, index) => {
                    return (
                        <Card key={index} title={proyek.nama} content="project based learning" routeShow={route('siswa.proyek.show', proyek.id)}>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="flex justify-between pr-4">
                                        Tenggat <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Nilai <span>:</span>
                                    </p>
                                    <p className="flex justify-between pr-4">
                                        Status <span>:</span>
                                    </p>
                                </div>
                                <div>
                                    <p>{formatDate(proyek.tenggat)}</p>
                                    <p>{proyek.nilai ?? '-'}</p>
                                    <span>
                                        {proyek.is_completed ? (
                                            <LabelStatus status="Selesai" variant="success" size="small" />
                                        ) : proyek.is_processed ? (
                                            <LabelStatus status="Belum Selesai" variant="warning" size="small" />
                                        ) : (
                                            <LabelStatus status="Belum Dikerjakan" variant="danger" size="small" />
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
