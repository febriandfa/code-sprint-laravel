import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

type SyntaxTwoForm = {
    status_tahap_5: string;
    feedback_tahap_5: string;
};

export default function SyntaxTwo() {
    const { currentSyntax, proyek, kelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    const statusOptions = [
        { value: 'diterima', label: 'Terima' },
        { value: 'direvisi', label: 'Revisi' },
        { value: 'ditolak', label: 'Tolak' },
    ];

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxTwoForm>>({
        status_tahap_5: 'diproses',
        feedback_tahap_5: '',
    });

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 5 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                status_tahap_5: jawaban.status_tahap_5 || '',
                feedback_tahap_5: jawaban.feedback_tahap_5 || '',
            }));
        }
    }, [jawaban]);

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                <RichTextView label="Merencanakan Proyek" value={jawaban?.jawaban_tahap_5} />
                {jawaban && (
                    <React.Fragment>
                        <InputSelect
                            id="status_tahap_5"
                            label="Status"
                            placeholder="Pilih status"
                            required
                            options={statusOptions}
                            value={data.status_tahap_5}
                            onChange={(e) => setData('status_tahap_5', e.value)}
                            error={errors.status_tahap_5}
                        />
                        <InputQuill
                            id="feedback_tahap_5"
                            label="Feedback"
                            placeholder="Masukkan feedback anda"
                            required
                            value={data.feedback_tahap_5}
                            onChange={(value: string) => setData('feedback_tahap_5', value)}
                            error={errors.feedback_tahap_5}
                        />
                    </React.Fragment>
                )}
                <PjblFooter onSubmit={handleOnSubmit} disabled={processing} guru />
            </div>
        </AuthLayout>
    );
}
