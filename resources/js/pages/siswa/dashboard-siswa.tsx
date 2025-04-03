import DoughnutChart from '@/components/doughnut-chart';
import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';
import { Auth, User } from '@/types';
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
    const { auth, latestProyekNilai, latestKuisNilai } = usePage().props as {
        auth?: Auth;
        latestProyekNilai?: ProyekNilai;
        latestKuisNilai?: KuisNilai;
    };

    console.log('latestProyekNilai', latestProyekNilai);
    console.log('latestKuisNilai', latestKuisNilai);

    const user = auth?.user as User;

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
                            <DoughnutChart datas={[12, 3]} title="Materi" labels={['Selesai', 'Belum Selesai']} />
                        </div>
                        <div>
                            <DoughnutChart datas={[12, 3]} title="Materi" labels={['Selesai', 'Belum Selesai']} colors={['#22c55e', '#d5d9e2']} />
                        </div>
                        <div>
                            <DoughnutChart datas={[12, 3]} title="Materi" labels={['Selesai', 'Belum Selesai']} colors={['#fac215', '#d5d9e2']} />
                        </div>
                    </div>
                </Container>
                <Container className="col-span-2">
                    <Subtitle subtitle="Pembelajaran Terbaru" />
                </Container>
            </div>
        </AuthLayout>
    );
}
