import IconGuruDash from '@/components/icons/icon-GuruDash';
import IconKelasDash from '@/components/icons/icon-KelasDash';
import IconMapelDash from '@/components/icons/icon-MapelDash';
import IconSiswaDash from '@/components/icons/icon-SiswaDash';
import Button from '@/components/ui/button';
import Container from '@/components/ui/container';
import AuthLayout from '@/layouts/auth-layout';
import { Link, usePage } from '@inertiajs/react';

export default function DashboardAdmin() {
    const { kelases, mapels, siswas, gurus } = usePage().props as {
        kelases?: number;
        mapels?: number;
        siswas?: number;
        gurus?: number;
    };

    return (
        <AuthLayout title="Dashboard Admin" siswa>
            <div className="grid grid-cols-2 gap-4">
                <Container>
                    <div className="flex items-center gap-4">
                        {/* <div className="bg-success-200 flex size-16 items-center justify-center rounded p-2">
                            <School size={32} className="text-success" />
                        </div> */}
                        <IconKelasDash />
                        <div>
                            <p className="text-lg text-slate-400">Total Kelas</p>
                            <p className="text-3xl font-medium">{kelases ?? 0}</p>
                        </div>
                    </div>
                    <div className="mt-6 w-fit">
                        <Link href={route('admin.kelas.create')}>
                            <Button className="w-full">Tambah Kelas</Button>
                        </Link>
                    </div>
                </Container>
                <Container>
                    <div className="flex items-center gap-4">
                        <IconMapelDash />
                        <div>
                            <p className="text-lg text-slate-400">Total Mata Pelajaran</p>
                            <p className="text-3xl font-medium">{mapels ?? 0}</p>
                        </div>
                    </div>
                    <div className="mt-6 w-fit">
                        <Link href={route('admin.mapel.create')}>
                            <Button className="w-full">Tambah Mata Pelajaran</Button>
                        </Link>
                    </div>
                </Container>
                <Container>
                    <div className="flex items-center gap-4">
                        <IconGuruDash />
                        <div>
                            <p className="text-lg text-slate-400">Total Guru</p>
                            <p className="text-3xl font-medium">{gurus ?? 0}</p>
                        </div>
                    </div>
                    <div className="mt-6 w-fit">
                        <Link href={route('admin.guru.create')}>
                            <Button className="w-full">Tambah Guru</Button>
                        </Link>
                    </div>
                </Container>
                <Container>
                    <div className="flex items-center gap-4">
                        <IconSiswaDash />
                        <div>
                            <p className="text-lg text-slate-400">Total Siswa</p>
                            <p className="text-3xl font-medium">{siswas ?? 0}</p>
                        </div>
                    </div>
                    <div className="mt-6 w-fit">
                        <Link href={route('admin.siswa.create')}>
                            <Button className="w-full">Tambah Siswa</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </AuthLayout>
    );
}
