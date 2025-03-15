import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kelas } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function KelasIndex() {
    const { kelases } = usePage().props as { kelases?: Kelas[] };

    const columns = [
        {
            name: 'Nama Kelas',
            selector: (row: Kelas) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Wali Kelas',
            cell: (row: Kelas) => row.wali_kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Kelas) => <ActionButton routeEdit={route('admin.kelas.edit', row.id)} routeDelete={route('admin.kelas.destroy', row.id)} />,
            width: '11rem',
        },
    ];

    const data = kelases?.map((kelas) => ({
        id: kelas.id,
        guru_id: kelas.guru_id,
        nama: kelas.nama,
        wali_kelas: kelas.wali_kelas,
    }));

    const searchBy = ['nama', 'wali_kelas'];

    return (
        <AuthLayout title="Kelas" index>
            <h1 className="text-2xl font-semibold text-gray-600">Data Kelas</h1>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.kelas.create')}>
                    <Button>Tambah Kelas</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
