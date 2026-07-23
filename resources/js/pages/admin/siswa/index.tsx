import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import NoData from '@/components/no-data';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { UserDetail } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexSiswa() {
    const { siswas } = usePage().props as { siswas?: UserDetail[] };

    const columns = [
        {
            name: 'Nomor',
            selector: (row: UserDetail) => row.no_absen,
            sortable: true,
            width: '7rem',
        },
        {
            name: 'Nama Siswa',
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
            name: 'Aksi',
            cell: (row: UserDetail) => (
                <ActionButton routeEdit={route('admin.siswa.edit', row.id)} routeDelete={route('admin.siswa.destroy', row.id)} />
            ),
            width: '11rem',
        },
    ];

    const data = siswas?.map((siswa) => ({
        id: siswa.id,
        no_absen: siswa.no_absen,
        name: siswa.name,
        email: siswa.email,
        password: siswa.combination,
        kelas: siswa.kelas,
    }));

    const searchBy = ['name', 'email', 'kelas'];

    return (
        <AuthLayout title="Siswa" index>
            <div className="mb-6 flex justify-end">
                <Link href={route('admin.siswa.create')}>
                    <Button>Tambah Siswa</Button>
                </Link>
            </div>
            {siswas?.length ? <DataTables columns={columns} data={data ?? []} searchBy={searchBy} /> : <NoData />}
        </AuthLayout>
    );
}
