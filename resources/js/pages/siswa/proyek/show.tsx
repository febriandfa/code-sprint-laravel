import ProyekTemplate from '@/components/proyek-template';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, KelompokAnggota, Proyek } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ProyekShow() {
    const { proyek, kelompok } = usePage().props as { proyek?: Proyek; kelompok?: Kelompok };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: '#' },
    ];

    const columns = [
        {
            name: 'No',
            selector: (row: KelompokAnggota) => row.id,
            sortable: true,
            wrap: true,
        },
        {
            name: 'No Absen',
            selector: (row: KelompokAnggota) => row.no_absen,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nama Siswa',
            selector: (row: KelompokAnggota) => row.nama_anggota,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Status',
            cell: (row: KelompokAnggota) => <span className="capitalize">{row.status}</span>,
            wrap: true,
        },
    ];

    const data = kelompok?.anggotas?.map((anggota, index) => ({
        id: index + 1,
        nama_anggota: anggota.nama_anggota,
        no_absen: anggota.no_absen,
        status: anggota.status,
    }));

    const searchBy = ['nama_anggota', 'no_absen'];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs} siswa>
            {proyek && <ProyekTemplate proyek={proyek} kelompok={kelompok} columns={columns} data={data ?? []} searchBy={searchBy} view />}
        </AuthLayout>
    );
}
