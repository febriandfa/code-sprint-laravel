import DataTables from '@/components/data-tables';
import AuthLayout from '@/layouts/auth-layout';
import { Nilai, UserDetail } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ShowNilai() {
    const { nilais, siswa } = usePage().props as { nilais?: Nilai[]; siswa?: UserDetail };

    console.log(nilais);

    const breadcrumbs = [
        { title: 'Nilai', link: route('guru.nilai.index') },
        { title: 'Detail Nilai', link: route('guru.nilai.siswa', siswa?.kelas_id) },
        { title: siswa?.name ?? 'Siswa', link: '#' },
    ];

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
        <AuthLayout title="Nilai" breadcrumbs={breadcrumbs}>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
