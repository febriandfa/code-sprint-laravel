import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexKuis() {
    const { kuises } = usePage().props as { kuises?: Kuis[] };

    const columns = [
        {
            name: 'Judul',
            selector: (row: Kuis) => row.judul,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Materi',
            selector: (row: Kuis) => row.materi,
            wrap: true,
        },
        {
            name: 'Durasi',
            selector: (row: Kuis) => row.durasi + ' menit',
            wrap: true,
        },
        {
            name: 'Mulai',
            selector: (row: Kuis) => row.tanggal_mulai,
            wrap: true,
        },
        {
            name: 'Selesai',
            selector: (row: Kuis) => row.tanggal_selesai,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Kuis) => (
                <ActionButton
                    routeEdit={route('guru.kuis.edit', row.id)}
                    routeDelete={route('guru.kuis.destroy', row.id)}
                    routeShow={route('guru.kuis.show', row.id)}
                />
            ),
            width: '11rem',
        },
    ];

    const data = kuises?.map((kuis) => ({
        id: kuis.id,
        judul: kuis.judul,
        materi: kuis.materi,
        durasi: kuis.durasi,
        tanggal_mulai: kuis.tanggal_mulai,
        tanggal_selesai: kuis.tanggal_selesai,
    }));

    const searchBy = ['judul', 'materi', 'tanggal_mulai', 'tanggal_selesai'];

    return (
        <AuthLayout title="Kuis" index>
            <div className="my-6 flex justify-end">
                <Link href={route('guru.kuis.create')}>
                    <Button>Tambah Kuis</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
