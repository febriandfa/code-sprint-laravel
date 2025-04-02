import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Embed from '@/components/ui/embed';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

type SyntaxFiveForm = {
    status_tahap_8: string;
    feedback_tahap_8: string;
};

export default function SyntaxFive() {
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

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxFiveForm>>({
        status_tahap_8: 'diproses',
        feedback_tahap_8: '',
    });

    const handleOnSubmit = () => {
        patch(route('guru.proyek.updateNilai', { proyekId: proyek?.id, id: jawaban?.id, step: 8 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                status_tahap_8: jawaban.status_tahap_8 || '',
                feedback_tahap_8: jawaban.feedback_tahap_8 || '',
            }));
        }
    }, [jawaban]);

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                <Embed label="File Proyek Akhir (ZIP)" src={jawaban?.file_proyek} downloadable />
                <Embed label="File Laporan/Media Presentasi" src={jawaban?.file_laporan} downloadable />
                {jawaban && (
                    <React.Fragment>
                        <InputSelect
                            id="status_tahap_8"
                            label="Status"
                            placeholder="Pilih status"
                            required
                            options={statusOptions}
                            value={data.status_tahap_8}
                            onChange={(e) => setData('status_tahap_8', e.value)}
                            error={errors.status_tahap_8}
                        />
                        <InputQuill
                            id="feedback_tahap_8"
                            label="Feedback"
                            placeholder="Masukkan feedback anda"
                            required
                            value={data.feedback_tahap_8}
                            onChange={(value: string) => setData('feedback_tahap_8', value)}
                            error={errors.feedback_tahap_8}
                        />
                    </React.Fragment>
                )}
                <PjblFooter onSubmit={handleOnSubmit} disabled={processing} guru />
            </div>
        </AuthLayout>
    );
}
