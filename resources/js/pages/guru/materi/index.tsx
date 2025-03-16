import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { stripHtml } from '@/lib/helper';
import { Materi } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexMateri() {
    const { materis } = usePage().props as { materis?: Materi[] };

    console.log(materis);

    const columns = [
        {
            name: 'Judul',
            selector: (row: Materi) => row.judul,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Deskripsi',
            cell: (row: Materi) => <span className="line-clamp-2">{stripHtml(row.deskripsi)}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kelas',
            selector: (row: Materi) => row.kelas,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Mata Pelajaran',
            selector: (row: Materi) => row.mapel,
            sortable: true,
            wrap: true,
        },
        {
            name: 'File Materi',
            selector: (row: Materi) => row.file_materi,
            wrap: true,
        },
        {
            name: 'File Modul',
            selector: (row: Materi) => row.file_modul,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Materi) => (
                <ActionButton
                    routeEdit={route('guru.materi.edit', row.id)}
                    routeDelete={route('guru.materi.destroy', row.id)}
                    routeShow={route('guru.materi.show', row.id)}
                />
            ),
            width: '11rem',
        },
    ];

    const data = materis?.map((materi) => ({
        id: materi.id,
        judul: materi.judul,
        deskripsi: materi.deskripsi,
        kelas: materi.kelas,
        mapel: materi.mapel,
        file_materi: materi.file_materi,
        file_modul: materi.file_modul,
    }));

    const searchBy = ['judul'];

    return (
        <AuthLayout title="Materi" index>
            <div className="my-6 flex justify-end">
                <Link href={route('guru.materi.create')}>
                    <Button>Tambah Materi</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
