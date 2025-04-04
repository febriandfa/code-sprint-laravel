import CardKuis from '@/components/card-kuis';
import CardMateri from '@/components/card-materi';
import CardProyek from '@/components/card-proyek';
import DoughnutChart from '@/components/doughnut-chart';
import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis, Materi, Proyek } from '@/types';
import { usePage } from '@inertiajs/react';
import { Book, School, Users } from 'lucide-react';
import React from 'react';

export default function DashboardGuru() {
    const { kelases, mapels, siswas, materis, proyeks, kuises, latestProyek, latestMateri, latestKuis } = usePage().props as {
        kelases?: number;
        mapels?: number;
        siswas?: number;
        materis?: Materi[];
        proyeks?: Proyek[];
        kuises?: Kuis[];
        latestProyek?: Proyek[];
        latestMateri?: Materi[];
        latestKuis?: Kuis[];
    };

    const finishedProyek = proyeks?.filter((proyek) => proyek.status === 'selesai').length;
    const finishedKuis = kuises?.filter((kuis) => new Date(kuis.tanggal_selesai) <= new Date()).length;

    return (
        <AuthLayout title="Dashboard" siswa>
            <div className="grid grid-cols-1 gap-4">
                <Container>
                    <Subtitle subtitle="Data Guru" className="mb-2" />
                    <div className="grid grid-cols-3">
                        <div className="flex items-center gap-4">
                            <div className="bg-success-200 flex size-12 items-center justify-center rounded p-2">
                                <School size={24} className="text-success" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Kelas Diajar</p>
                                <p className="text-lg font-medium">{kelases ?? 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-200 flex size-12 items-center justify-center rounded p-2">
                                <Book size={24} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Mapel Diajar</p>
                                <p className="text-lg font-medium">{mapels ?? 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-danger-200 flex size-12 items-center justify-center rounded p-2">
                                <Users size={24} className="text-danger" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Siswa Diajar</p>
                                <p className="text-lg font-medium">{siswas ?? 0}</p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container>
                    <Subtitle subtitle="Grafik Pembelajaran" className="mb-2" />
                    {latestProyek?.length === 0 && latestKuis?.length === 0 && latestMateri?.length === 0 && (
                        <p className="text-center text-lg text-slate-400 capitalize">Tidak ada data proyek, materi, kuis</p>
                    )}
                    <div className="flex justify-evenly gap-6">
                        {kuises?.length !== 0 && (
                            <div className="w-1/3">
                                <DoughnutChart
                                    datas={[finishedKuis ?? 0, (kuises?.length ?? 0) - (finishedKuis ?? 0)]}
                                    title="Kuis"
                                    labels={['Selesai', 'Belum Selesai']}
                                    colors={['#22c55e', '#d5d9e2']}
                                />
                            </div>
                        )}
                        {proyeks?.length !== 0 && (
                            <div className="w-1/3">
                                <DoughnutChart
                                    datas={[finishedProyek ?? 0, (proyeks?.length ?? 0) - (finishedProyek ?? 0)]}
                                    title="Proyek"
                                    labels={['Selesai', 'Belum Selesai']}
                                    colors={['#fac215', '#d5d9e2']}
                                />
                            </div>
                        )}
                    </div>
                </Container>
                <Container>
                    {latestProyek?.length === 0 && latestKuis?.length === 0 && latestMateri?.length === 0 && (
                        <React.Fragment>
                            <Subtitle subtitle="Pembelajaran Terbaru" className="mb-2" />
                            <p className="text-center text-lg text-slate-400 capitalize">Tidak ada data proyek, materi, kuis</p>
                        </React.Fragment>
                    )}
                    <div className="grid grid-cols-3 gap-6">
                        {materis?.length !== 0 && (
                            <div>
                                <Subtitle subtitle="Materi Terbaru" />
                                <CardMateri
                                    materiId={latestMateri?.[0]?.id ?? 1}
                                    title={latestMateri?.[0]?.judul ?? ''}
                                    description={latestMateri?.[0]?.deskripsi ?? ''}
                                    mapel={latestMateri?.[0]?.mapel ?? ''}
                                    createdAt={latestMateri?.[0]?.created_at ?? ''}
                                    guru
                                />
                            </div>
                        )}
                        {kuises?.length !== 0 && (
                            <div>
                                <Subtitle subtitle="Kuis Terbaru" />
                                <CardKuis
                                    kuisId={latestKuis?.[0]?.id ?? 1}
                                    title={latestKuis?.[0]?.judul ?? ''}
                                    totalSoal={latestKuis?.[0]?.total_soal ?? 0}
                                    totalPoin={latestKuis?.[0]?.total_poin ?? '-'}
                                    duration={latestKuis?.[0]?.durasi ?? 0}
                                    isCompleted={latestKuis?.[0]?.is_completed ?? false}
                                    guru
                                />
                            </div>
                        )}
                        {proyeks?.length !== 0 && (
                            <div>
                                <Subtitle subtitle="Proyek Terbaru" />
                                <CardProyek
                                    proyekId={latestProyek?.[0]?.id ?? 1}
                                    title={latestProyek?.[0]?.nama ?? ''}
                                    deadline={latestProyek?.[0]?.tenggat ?? ''}
                                    score={latestProyek?.[0]?.nilai ?? '-'}
                                    isCompleted={latestProyek?.[0]?.is_completed ?? false}
                                    isProcessed={latestProyek?.[0]?.is_processed ?? false}
                                    guru
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </AuthLayout>
    );
}
