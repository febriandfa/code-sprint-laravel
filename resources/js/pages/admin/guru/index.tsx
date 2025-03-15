import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexGuru() {
    const { gurus } = usePage().props as { gurus?: User[] };

    console.log(gurus);

    const columns = [
        {
            name: 'Nama Guru',
            selector: (row: User) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            cell: (row: User) => row.email,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Mata Pelajaran',
            cell: (row: User) => row.mapel,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: User) => <ActionButton routeEdit={route('admin.guru.edit', row.id)} routeDelete={route('admin.guru.destroy', row.id)} />,
            width: '11rem',
        },
    ];

    const data = gurus?.map((guru) => ({
        id: guru.id,
        name: guru.name,
        email: guru.email,
        mapel: guru.mapel,
    }));

    const searchBy = ['name', 'email', 'mapel'];

    return (
        <AuthLayout title="Guru" index>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.guru.create')}>
                    <Button>Tambah Guru</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
