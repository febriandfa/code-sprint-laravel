import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Embed from '@/components/ui/embed';
import LabelStatus from '@/components/ui/label-status';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

type SyntaxThreeForm = {
    status_tahap_6: string;
    feedback_tahap_6: string;
};

export default function SyntaxThree() {
    const { currentSyntax, proyek, kelompok, jawaban } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    const statusOptions = [
        { value: 'diterima', label: 'Terima' },
        { value: 'direvisi', label: 'Revisi' },
        { value: 'ditolak', label: 'Tolak' },
    ];

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxThreeForm>>({
        status_tahap_6: 'diproses',
        feedback_tahap_6: '',
    });

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 6 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                status_tahap_6: jawaban.status_tahap_6 || '',
                feedback_tahap_6: jawaban.feedback_tahap_6 || '',
            }));
        }
    }, [jawaban]);

    const handleDownload = () => {
        const fileUrl = `/assets/downloads/gantt-chart-example.xlsx`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'gantt-chart-example.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                <div className="space-y-3">
                    <LabelStatus status="PERHATIAN!" />
                    <p className="text-justify text-lg">
                        Pada Sintaks 3 : Menyusun Jadwal, peserta didik berdiskusi tentang penyusunan jadwan yang akan dikerjakan dalam mengerjakan
                        studi kasus, untuk jawaban hanya diinputkan oleh ketua kelompok.
                        <br />
                        <br />
                        Jadwal dibuat dengan mengunakan metode GanttChart, dapat dilihat pada contoh.
                    </p>
                    <Button variant="outline-primary" onClick={handleDownload}>
                        Unduh Contoh GanttChart
                    </Button>
                </div>
                <Embed label="Jadwal Proyek" src={jawaban?.jawaban_tahap_6} downloadable />
                {jawaban && (
                    <React.Fragment>
                        <InputSelect
                            id="status_tahap_5"
                            label="Status"
                            placeholder="Pilih status"
                            required
                            options={statusOptions}
                            value={data.status_tahap_6}
                            onChange={(e) => setData('status_tahap_6', e.value)}
                            error={errors.status_tahap_6}
                        />
                        <InputQuill
                            id="feedback_tahap_5"
                            label="Feedback"
                            placeholder="Masukkan feedback anda"
                            required
                            value={data.feedback_tahap_6}
                            onChange={(value: string) => setData('feedback_tahap_6', value)}
                            error={errors.feedback_tahap_6}
                        />
                    </React.Fragment>
                )}
                <PjblFooter onSubmit={handleOnSubmit} disabled={processing} guru />
            </div>
        </AuthLayout>
    );
}
