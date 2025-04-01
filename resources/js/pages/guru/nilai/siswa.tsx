import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import AuthLayout from '@/layouts/auth-layout';
import { UserDetail } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SiswaNilai() {
    const { siswas } = usePage().props as { siswas?: UserDetail[] };

    const breadcrumbs = [
        { title: 'Nilai', link: route('guru.nilai.index') },
        { title: 'Detail Nilai', link: '#' },
    ];

    const columns = [
        {
            name: 'No Absen',
            selector: (row: UserDetail) => row.no_absen,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nama',
            selector: (row: UserDetail) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: UserDetail) => row.kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: UserDetail) => <ActionButton routeShow={route('guru.nilai.show', row.id)} />,
            width: '11rem',
        },
    ];

    const data = siswas?.map((siswa) => ({
        id: siswa.id,
        no_absen: siswa.no_absen,
        name: siswa.name,
        kelas: siswa.kelas,
    }));

    const searchBy = ['no_absen', 'name'];

    return (
        <AuthLayout title="Nilai" breadcrumbs={breadcrumbs}>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
