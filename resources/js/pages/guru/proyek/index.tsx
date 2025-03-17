import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { stripHtml } from '@/lib/helper';
import { Proyek } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexProyek() {
    const { proyeks } = usePage().props as { proyeks?: Proyek[] };

    const columns = [
        {
            name: 'Nama Proyek',
            selector: (row: Proyek) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Deskripsi',
            cell: (row: Proyek) => <span className="line-clamp-2">{stripHtml(row.deskripsi)}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: Proyek) => row.kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Mata Pelajaran',
            selector: (row: Proyek) => row.mapel,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Tenggat',
            selector: (row: Proyek) => row.tenggat,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Status',
            selector: (row: Proyek) => row.status,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Proyek) => (
                <ActionButton
                    routeEdit={route('guru.proyek.edit', row.id)}
                    routeDelete={route('guru.proyek.destroy', row.id)}
                    routeShow={route('guru.proyek.show', row.id)}
                />
            ),
            width: '11rem',
        },
    ];

    const data = proyeks?.map((proyek) => ({
        id: proyek.id,
        nama: proyek.nama,
        deskripsi: proyek.deskripsi,
        kelas: proyek.kelas,
        mapel: proyek.mapel,
        tenggat: proyek.tenggat,
        status: proyek.status,
    }));

    const searchBy = ['judul', 'kelas', 'mapel', 'tenggat'];

    return (
        <AuthLayout title="Proyek" index>
            <div className="my-6 flex justify-end">
                <Link href={route('guru.proyek.create')}>
                    <Button>Tambah Proyek</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
