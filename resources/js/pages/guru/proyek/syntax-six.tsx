import ActionButton from '@/components/action-button';
import DataTables from '@/components/data-tables';
import InputQuill from '@/components/input-quill';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { stripHtml } from '@/lib/helper';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type SyntaxSixForm = {
    refleksi: string;
};

export default function SyntaxSix() {
    const { currentSyntax, proyek, kelompok, jawaban, nilais } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        nilais?: ProyekNilai[];
    };

    console.log('jawaban', jawaban);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxSixForm>>({
        refleksi: jawaban?.refleksi ?? '',
    });

    const handleOnSubmit = () => {
        patch(route('guru.proyek.updateNilai', { proyekId: proyek?.id, id: jawaban?.id, step: 9 }), {
            onSuccess: () => {},
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                refleksi: jawaban.refleksi || '',
            }));
        }
    }, [jawaban]);

    const columns = [
        {
            name: 'Nama Siswa',
            selector: (row: ProyekNilai) => row.siswa,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Orientasi Masalah',
            selector: (row: ProyekNilai) => row.nilai_orientasi_masalah,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Kerja Sama Tim',
            selector: (row: ProyekNilai) => row.nilai_kerja_sama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Proses Pengerjaan',
            selector: (row: ProyekNilai) => row.nilai_proses,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Waktu Pengerjaan',
            selector: (row: ProyekNilai) => row.nilai_waktu,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Hasil Proyek',
            selector: (row: ProyekNilai) => row.nilai_hasil_proyek,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nilai',
            selector: (row: ProyekNilai) => row.nilai,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Evaluasi',
            cell: (row: ProyekNilai) => <span className="line-clamp-2">{row.evaluasi ? stripHtml(row.evaluasi) : 'Tidak ada evaluasi'}</span>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Aksi',
            cell: (row: ProyekNilai) => <ActionButton routeEdit={route('guru.proyek.nilaiEdit', { proyekId: proyek?.id, id: row.id })} />,
            width: '11rem',
        },
    ];

    const dataTable = nilais?.map((nilai) => ({
        id: nilai.id,
        siswa: nilai.siswa,
        nilai_orientasi_masalah: nilai.nilai_orientasi_masalah,
        nilai_kerja_sama: nilai.nilai_kerja_sama,
        nilai_proses: nilai.nilai_proses,
        nilai_waktu: nilai.nilai_waktu,
        nilai_hasil_proyek: nilai.nilai_hasil_proyek,
        nilai: nilai.nilai,
        evaluasi: nilai.evaluasi,
    }));

    const searchBy = ['nama_siswa', 'nilai'];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                {jawaban && (
                    <InputQuill
                        id="refleksi"
                        label="Refleksi Kelompok"
                        placeholder="Masukkan refleksi anda"
                        required
                        value={data.refleksi}
                        onChange={(value: string) => setData('refleksi', value)}
                        error={errors.refleksi}
                    />
                )}
                <PjblFooter onSubmit={handleOnSubmit} disabled={processing} guru />
            </div>
            <div className="my-4 h-0.5 bg-gray-300" />
            <div className="my-5 space-y-6">
                <div className="mb-6 flex justify-end">
                    <Link href={route('guru.proyek.nilaiCreate', { proyekId: proyek?.id, kelompokId: kelompok?.id })}>
                        <Button>Tambah Nilai</Button>
                    </Link>
                </div>
                <DataTables columns={columns} data={dataTable ?? []} searchBy={searchBy} />
            </div>
        </AuthLayout>
    );
}
