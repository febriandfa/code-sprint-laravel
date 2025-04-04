import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName, stripHtml } from '@/lib/helper';
import { Materi } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexMateri() {
    const { materis } = usePage().props as { materis?: Materi[] };

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
            cell: (row: Materi) => (
                <a href={`/storage/${row.file_materi}`} target="_blank" className="text-primary line-clamp-2 underline">
                    {getFileName(row.file_materi, 'materi')}
                </a>
            ),
            wrap: true,
        },
        {
            name: 'File Modul',
            cell: (row: Materi) => (
                <a href={`/storage/${row.file_modul}`} target="_blank" className="text-primary line-clamp-2 underline">
                    {getFileName(row.file_modul, 'modul')}
                </a>
            ),
            wrap: true,
        },
        {
            name: 'Video Materi',
            cell: (row: Materi) => (
                <a href={`/storage/${row.video_materi}`} target="_blank" className="text-primary line-clamp-2 underline">
                    {getFileName(row.video_materi, 'video')}
                </a>
            ),
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
        video_materi: materi.video_materi,
    }));

    const searchBy = ['judul', 'kelas', 'mapel'];

    return (
        <AuthLayout title="Materi" index>
            <div className="mb-6 flex justify-end">
                <Link href={route('guru.materi.create')}>
                    <Button>Tambah Materi</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
