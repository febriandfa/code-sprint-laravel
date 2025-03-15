import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexSiswa() {
    const { siswas } = usePage().props as { siswas?: User[] };

    console.log(siswas);

    const columns = [
        {
            name: 'Nomor',
            selector: (row: User) => row.no_absen,
            sortable: true,
            width: '7rem',
        },
        {
            name: 'Nama Siswa',
            selector: (row: User) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            selector: (row: User) => row.email,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: User) => row.kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: User) => <ActionButton routeEdit={route('admin.siswa.edit', row.id)} routeDelete={route('admin.siswa.destroy', row.id)} />,
            width: '11rem',
        },
    ];

    const data = siswas?.map((siswa) => ({
        id: siswa.id,
        no_absen: siswa.no_absen,
        name: siswa.name,
        email: siswa.email,
        kelas: siswa.kelas,
    }));

    const searchBy = ['name', 'email', 'kelas'];

    return (
        <AuthLayout title="Siswa" index>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.siswa.create')}>
                    <Button>Tambah Siswa</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
