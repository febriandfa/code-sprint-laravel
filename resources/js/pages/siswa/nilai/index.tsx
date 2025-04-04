import DataTables from '@/components/data-tables';
import Title from '@/components/ui/title';
import AuthLayout from '@/layouts/auth-layout';
import { Nilai } from '@/types';
import { usePage } from '@inertiajs/react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const labels = nilais?.map((nilai) => nilai.judul) || [];

    const dataGraph = {
        labels,
        datasets: [
            {
                label: 'Nilai Kuis',
                data: nilais?.map((nilai) => nilai.nilai_kuis) || [],
                backgroundColor: '#3B82F6',
            },
            {
                label: 'Nilai Proyek',
                data: nilais?.map((nilai) => nilai.nilai_proyek) || [],
                backgroundColor: '#BFD7FE',
            },
        ],
    };

    return (
        <AuthLayout title="Nilai" index isEmpty={!nilais?.length}>
            <DataTables columns={columns} data={data ?? []} searchBy={searchBy} />
            <div className="space-y-6">
                <Title title="Grafik Nilai" />
                <Bar options={options} data={dataGraph} />
            </div>
        </AuthLayout>
    );
}
