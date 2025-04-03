import CardKuis from '@/components/card-kuis';
import CardMateri from '@/components/card-materi';
import CardProyek from '@/components/card-proyek';
import DoughnutChart from '@/components/doughnut-chart';
import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Auth, Kuis, Materi, Proyek, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Files, MessageCircleQuestion } from 'lucide-react';

type ProyekNilai = {
    nama: string;
    nilai: number;
    created_at: string;
};

type KuisNilai = {
    judul: string;
    total_poin: number;
    created_at: string;
};

export default function DashboardSiswa() {
    const { auth, latestProyekNilai, latestKuisNilai, materis, proyeks, kuises, latestProyek, latestMateri, latestKuis } = usePage().props as {
        auth?: Auth;
        latestProyekNilai?: ProyekNilai;
        latestKuisNilai?: KuisNilai;
        materis?: Materi[];
        proyeks?: Proyek[];
        kuises?: Kuis[];
        latestProyek?: Proyek[];
        latestMateri?: Materi[];
        latestKuis?: Kuis[];
    };

    console.log('latestMateri', latestMateri);

    const user = auth?.user as User;
    const finishedMateri = materis?.filter((materi) => materi.is_read).length;
    const finishedProyek = proyeks?.filter((proyek) => proyek.is_completed).length;
    const finishedKuis = kuises?.filter((kuis) => kuis.is_completed).length;

    return (
        <AuthLayout title="Dashboard" siswa>
            <div className="grid grid-cols-2 gap-4">
                <Container className="col-span-1">
                    <div className="mb-2 flex items-center justify-between">
                        <Subtitle subtitle="Data Diri" />
                        <Link href="" className="text-primary text-sm">
                            Lihat Detail
                        </Link>
                    </div>
                    <div className="flex gap-6">
                        <div className="size-40 rounded-lg bg-green-100" />
                        <div>
                            <p className="text-2xl font-medium">{user?.name}</p>
                            <div className="mt-2 grid grid-cols-2 gap-16">
                                <div>
                                    <p className="text-sm text-slate-400">Kelas</p>
                                    <p className="text-lg font-medium">{user?.user_detail?.kelas?.nama}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">No Absen</p>
                                    <p className="text-lg font-medium">{user?.user_detail?.no_absen}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container className="col-span-1">
                    <Subtitle subtitle="Tugas Terbaru" />
                    <div className="flex h-full flex-col justify-center space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-success-200 flex size-12 items-center justify-center rounded p-2">
                                <MessageCircleQuestion size={24} className="text-success" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Kuis {latestKuisNilai?.judul}</p>
                                <p className="text-lg font-medium">{latestKuisNilai?.total_poin ?? '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-warning-200 flex size-12 items-center justify-center rounded p-2">
                                <Files size={24} className="text-warning" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Proyek {latestProyekNilai?.nama}</p>
                                <p className="text-lg font-medium">{latestProyekNilai?.nilai ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container className="col-span-2">
                    <Subtitle subtitle="Grafik Pembelajaran" className="mb-2" />
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <DoughnutChart
                                datas={[finishedMateri ?? 0, (materis?.length ?? 0) - (finishedMateri ?? 0)]}
                                title="Materi"
                                labels={['Selesai', 'Belum Selesai']}
                            />
                        </div>
                        <div>
                            <DoughnutChart
                                datas={[finishedKuis ?? 0, (kuises?.length ?? 0) - (finishedKuis ?? 0)]}
                                title="Kuis"
                                labels={['Selesai', 'Belum Selesai']}
                                colors={['#22c55e', '#d5d9e2']}
                            />
                        </div>
                        <div>
                            <DoughnutChart
                                datas={[finishedProyek ?? 0, (proyeks?.length ?? 0) - (finishedProyek ?? 0)]}
                                title="Proyek"
                                labels={['Selesai', 'Belum Selesai']}
                                colors={['#fac215', '#d5d9e2']}
                            />
                        </div>
                    </div>
                </Container>
                <Container className="col-span-2">
                    <Subtitle subtitle="Pembelajaran Terbaru" className="mb-2" />
                    <div className="grid grid-cols-3 gap-6">
                        {/* Card Proyek */}
                        <CardProyek
                            proyekId={latestProyek?.[0]?.id ?? 1}
                            title={latestProyek?.[0]?.nama ?? ''}
                            deadline={latestProyek?.[0]?.tenggat ?? ''}
                            score={latestProyek?.[0]?.nilai ?? '-'}
                            isCompleted={latestProyek?.[0]?.is_completed ?? false}
                            isProcessed={latestProyek?.[0]?.is_processed ?? false}
                        />

                        {/* Card Kuis */}
                        <CardKuis
                            kuisId={latestKuis?.[0]?.id ?? 1}
                            title={latestKuis?.[0]?.judul ?? ''}
                            totalSoal={latestKuis?.[0]?.total_soal ?? 0}
                            totalPoin={latestKuis?.[0]?.total_poin ?? '-'}
                            duration={latestKuis?.[0]?.durasi ?? 0}
                            isCompleted={latestKuis?.[0]?.is_completed ?? false}
                        />

                        {/* Card Materi */}
                        <CardMateri
                            materiId={latestMateri?.[0]?.id ?? 1}
                            title={latestMateri?.[0]?.judul ?? ''}
                            description={latestMateri?.[0]?.deskripsi ?? ''}
                            createdAt={latestMateri?.[0]?.created_at ?? ''}
                            isRead={latestMateri?.[0]?.is_read ?? false}
                        />
                    </div>
                </Container>
            </div>
        </AuthLayout>
    );
}
