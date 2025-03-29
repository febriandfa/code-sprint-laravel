import InputField from '@/components/input-field';
import Label from '@/components/ui/label';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ShowKelompok() {
    const { proyek, kelompok } = usePage().props as { proyek?: Proyek; kelompok?: Kelompok };

    const anggotas = kelompok?.anggotas?.filter((anggota) => anggota.status === 'anggota');

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.kelompok', proyek?.id) },
        { title: 'Lihat Kelompok', link: '#' },
    ];

    return (
        <AuthLayout title="Lihat Kelompok" breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <InputField id="nama" label="Nama Kelompok" value={kelompok?.nama} disabled />
                <InputField id="jumlah_anggota" label="Jumlah Anggota" value={kelompok?.jumlah_anggota} disabled />
                <InputField id="ketua" label="Ketua Kelompok" value={kelompok?.ketua} disabled />
                <div className="">
                    <Label id="anggota" label="Anggota Kelompok" />
                    <div className="rounded-md border border-gray-200 px-4 py-2">
                        {(anggotas ?? []).length > 0 ? (
                            <ul className="list-disc pl-5">
                                {(anggotas ?? []).map((anggota) => (
                                    <li key={anggota.id} className="text-gray-700">
                                        {anggota.nama_anggota}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Tidak ada anggota kelompok</p>
                        )}
                    </div>
                </div>
                <RichTextView label="Orientasi Masalah" value={kelompok?.masalah} />
            </div>
        </AuthLayout>
    );
}
