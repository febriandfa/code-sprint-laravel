import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { stripHtml } from '@/lib/helper';
import { Mapel } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function IndexMapel() {
    const { mapels } = usePage().props as { mapels?: Mapel[] };

    const columns = [
        {
            name: 'Mata Pelajaran',
            selector: (row: Mapel) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Deskripsi',
            cell: (row: Mapel) => <span className="line-clamp-2">{stripHtml(row.deskripsi)}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Semester',
            selector: (row: Mapel) => row.semester,
            cell: (row: Mapel) => <span className="capitalize">{row.semester}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Tahun Ajaran',
            selector: (row: Mapel) => row.tahun_ajaran,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Mapel) => <ActionButton routeEdit={route('admin.mapel.edit', row.id)} routeDelete={route('admin.mapel.destroy', row.id)} />,
            width: '11rem',
        },
    ];

    const data = mapels?.map((mapel) => ({
        id: mapel.id,
        nama: mapel.nama,
        deskripsi: mapel.deskripsi,
        semester: mapel.semester,
        tahun_ajaran: mapel.tahun_ajaran,
    }));

    const searchBy = ['nama'];

    return (
        <AuthLayout title="Mata Pelajaran" index>
            <div className="my-6 flex justify-end">
                <Link href={route('admin.mapel.create')}>
                    <Button>Tambah Mata Pelajaran</Button>
                </Link>
            </div>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
