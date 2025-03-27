import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { GuruDetail, UserDetail } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexGuru() {
    const { gurus } = usePage().props as { gurus?: GuruDetail[] };

    const columns = [
        {
            name: 'Nama Guru',
            selector: (row: UserDetail) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            selector: (row: UserDetail) => row.email,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Password',
            selector: (row: UserDetail) => row.password,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: UserDetail) => row.kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Mata Pelajaran',
            selector: (row: UserDetail) => row.mapel,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: UserDetail) => (
                <ActionButton routeEdit={route('admin.guru.edit', row.id)} routeDelete={route('admin.guru.destroy', row.id)} />
            ),
            width: '11rem',
        },
    ];

    const data = gurus?.map((guru) => ({
        id: guru.id,
        name: guru.name,
        password: guru.combination,
        email: guru.email,
        kelas: guru.kelases.map((kelas) => kelas.nama).join(', '),
        mapel: guru.mapels.map((mapel) => mapel.nama).join(', '),
    }));

    const searchBy = ['name', 'email', 'mapel'];

    return (
        <AuthLayout title="Guru" index>
            <div className="mb-6 flex justify-end">
                <Link href={route('admin.guru.create')}>
                    <Button>Tambah Guru</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
