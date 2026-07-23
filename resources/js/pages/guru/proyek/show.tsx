import ActionButton from '@/components/action-button';
import ProyekTemplate from '@/components/proyek-template';
import Button from '@/components/ui/button';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function ShowProyek() {
    const { proyek, kelompoks, jawabans } = usePage().props as { proyek?: Proyek; kelompoks?: Kelompok[]; jawabans?: ProyekJawaban[] };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: '#' },
    ];

    const columns = [
        {
            name: 'Nama Kelompok',
            selector: (row: Kelompok) => row.nama,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Nama Ketua',
            selector: (row: Kelompok) => row.ketua,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Jumlah Anggota',
            cell: (row: Kelompok) => <LabelStatus variant={row.is_full ? 'danger' : 'success'} size="small" status={row.jumlah_anggota.toString()} />,
            wrap: true,
        },
       {
            name: 'Progres Saat Ini',
            cell: (row: Kelompok) => {
                const kelompokJawaban = jawabans?.find((jawaban) => jawaban.kelompok_id == row.id) as ProyekJawaban;

                const progressSteps = [
                    { key: 'status_tahap_1', label: 'Sintaks 1 Tahap 1', percentage: 0 },
                    { key: 'status_tahap_2', label: 'Sintaks 1 Tahap 2', percentage: 12.5 },
                    { key: 'status_tahap_3', label: 'Sintaks 1 Tahap 3', percentage: 25 },
                    { key: 'status_tahap_4', label: 'Sintaks 1 Tahap 4', percentage: 37.5 },
                    { key: 'status_tahap_5', label: 'Sintaks 2', percentage: 50 },
                    { key: 'status_tahap_6', label: 'Sintaks 3', percentage: 62.5 },
                    { key: 'status_tahap_7', label: 'Sintaks 4', percentage: 75 },
                    { key: 'status_tahap_8', label: 'Sintaks 5', percentage: 87.5 },
                ];

                let progress = { label: 'Sintaks 1 Tahap 1', percentage: 0 };

                if (kelompokJawaban) {
                    if (proyek?.refleksi && kelompokJawaban.status_tahap_8) {
                        progress = { label: 'Evaluasi - Selesai', percentage: 100 };
                    } else {
                        const latestProgress = [...progressSteps].reverse().find((step) => kelompokJawaban[step.key as keyof ProyekJawaban]);
                        if (latestProgress) {
                            progress = latestProgress;
                        }
                    }
                }

                return (
                    <div className="my-2">
                        <div>Progres: {progress.percentage}%</div>
                        <div style={{ background: '#eee', borderRadius: '5px', height: '10px', marginTop: '4px', marginBottom: '4px' }}>
                            <div
                                style={{
                                    width: `${progress.percentage}%`,
                                    background: progress.percentage === 100 ? '#45E247' : '#2196f3',
                                    height: '100%',
                                    borderRadius: '5px',
                                    transition: 'width 0.3s ease-in-out',
                                }}
                            />
                        </div>
                        <div className="">{progress.label}</div>
                    </div>
                );
            },
            wrap: true,
        },
        {
            name: 'Progres',
            cell: (row: Kelompok) => (
                <Link href={route('guru.proyek.syntaxOne', { proyekId: proyek?.id, kelompokId: row.id })}>
                    <Button>Lihat</Button>
                </Link>
            ),
        },
        {
            name: 'Aksi',
            cell: (row: Kelompok) => (
                <ActionButton
                    routeEdit={route('guru.proyek.kelompokEdit', { proyekId: proyek?.id, kelompokId: row.id })}
                    routeDelete={route('guru.proyek.kelompokDestroy', { proyekId: proyek?.id, kelompokId: row.id })}
                    routeShow={route('guru.proyek.kelompokShow', { proyekId: proyek?.id, kelompokId: row.id })}
                />
            ),
            width: '11rem',
        },
    ];

    const data = kelompoks?.map((kelompok) => ({
        id: kelompok.id,
        nama: kelompok.nama,
        ketua: kelompok.ketua,
        is_full: kelompok.anggotas?.length === kelompok.jumlah_anggota,
        jumlah_anggota: `${kelompok.anggotas?.length ?? 0}/${kelompok.jumlah_anggota}`,
    }));

    const searchBy = ['nama', 'ketua'];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs} siswa>
            {proyek && kelompoks && <ProyekTemplate proyek={proyek} columns={columns} data={data ?? []} searchBy={searchBy} />}
        </AuthLayout>
    );
}
