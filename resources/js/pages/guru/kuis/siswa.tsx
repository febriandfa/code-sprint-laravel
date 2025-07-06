import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import AuthLayout from '@/layouts/auth-layout';
import { HasilKuis, Kuis } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SiswaKuis() {
    const { kuis, hasilSiswas } = usePage().props as { kuis?: Kuis; hasilSiswas?: HasilKuis[] };

    const breadcrumbs = [
        { title: 'Kuis', link: route('guru.kuis.index') },
        { title: 'Hasil Kuis', link: '#' },
    ];

    const columns = [
        {
            name: 'Nama',
            selector: (row: HasilKuis) => row.nama_siswa,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nilai',
            selector: (row: HasilKuis) => row.total_poin,
            sortable: true,
            wrap: true,
        },
        // {
        //     name: 'Waktu Pengumpulan',
        //     selector: (row: HasilKuis) => row.created_at ?? '-',
        //     sortable: true,
        //     wrap: true,
        // },
        {
            name: 'Aksi',
            cell: (row: HasilKuis) => <ActionButton routeShow={route('guru.kuis.hasil', { kuisId: kuis?.id, siswaId: row.user_id })} />,
            width: '11rem',
        },
    ];

    const data = hasilSiswas?.map((hasil) => ({
        id: hasil.id,
        user_id: hasil.user_id,
        nama_siswa: hasil.nama_siswa,
        total_poin: hasil.total_poin,
        created_at: hasil.created_at,
    }));

    const searchBy = ['nama_siswa', 'total_poin', 'created_at'];

    return (
        <AuthLayout title={`Hasil Kuis ${kuis?.judul ?? ''}`} breadcrumbs={breadcrumbs}>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
        </AuthLayout>
    );
}
