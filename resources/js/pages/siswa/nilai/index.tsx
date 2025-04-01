import DataTables from '@/components/data-tables';
import AuthLayout from '@/layouts/auth-layout';
import { Nilai } from '@/types';
import { usePage } from '@inertiajs/react';

export default function IndexNilai() {
    const { nilais } = usePage().props as { nilais?: Nilai[] };

    const columns = [
        {
            name: 'No',
            cell: (row: Nilai, index: number) => <span>{index + 1}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Materi',
            selector: (row: Nilai) => row.judul,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nilai Kuis',
            selector: (row: Nilai) => row.nilai_kuis,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nilai Proyek',
            selector: (row: Nilai) => row.nilai_proyek,
            sortable: true,
            wrap: true,
        },
    ];

    const data = nilais?.map((nilai) => ({
        id: nilai.id,
        judul: nilai.judul,
        nilai_kuis: nilai.nilai_kuis ?? '-',
        nilai_proyek: nilai.nilai_proyek ?? '-',
    }));

    const searchBy = ['judul'];

    return (
        <AuthLayout title="Nilai" index>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
