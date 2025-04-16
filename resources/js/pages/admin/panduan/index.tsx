import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import NoData from '@/components/no-data';
import AuthLayout from '@/layouts/auth-layout';
import { getFileName } from '@/lib/helper';
import { Panduan } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexPanduan() {
    const { panduans } = usePage().props as { panduans?: Panduan[] };

    const columns = [
        {
            name: 'Judul',
            selector: (row: Panduan) => row.judul,
            sortable: true,
            wrap: true,
        },
        {
            name: 'File',
            cell: (row: Panduan) => (
                <a href={row.file ? `/storage/${row.file}` : '#'} target="_blank" className="text-primary line-clamp-2 underline">
                    {row.file ? getFileName(row.file, 'panduan') : 'Belum ada file'}
                </a>
            ),
            wrap: true,
        },
        {
            name: 'Untuk',
            selector: (row: Panduan) => row.role,
            cell: (row: Panduan) => <span className="capitalize">{row.role}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: Panduan) => <ActionButton routeEdit={route('admin.panduan.edit', row.id)} />,
            width: '11rem',
        },
    ];

    const data = panduans?.map((panduan) => ({
        id: panduan.id,
        judul: panduan.judul,
        file: panduan.file,
        role: panduan.role,
    }));

    const searchBy = ['judul'];

    return (
        <AuthLayout title="Panduan" index>
            {panduans?.length ? <DataTables columns={columns} data={data ?? []} searchBy={searchBy} /> : <NoData />}
        </AuthLayout>
    );
}
