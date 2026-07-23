import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import NoData from '@/components/no-data';
import AuthLayout from '@/layouts/auth-layout';
import { Kelas } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexNilai() {
    const { kelases } = usePage().props as { kelases?: Kelas[] };

    const columns = [
        {
            name: 'No',
            cell: (row: Kelas, index: number) => <span>{index + 1}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: Kelas) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Kelas) => <ActionButton routeShow={route('guru.nilai.siswa', row.id)} />,
            width: '11rem',
        },
    ];

    const data = kelases?.map((kelas) => ({
        id: kelas.id,
        nama: kelas.nama,
    }));

    const searchBy = ['nama'];

    return (
        <AuthLayout title="Nilai" index>
            {kelases?.length ? <DataTables columns={columns} data={data ?? []} searchBy={searchBy} /> : <NoData />}
        </AuthLayout>
    );
}
