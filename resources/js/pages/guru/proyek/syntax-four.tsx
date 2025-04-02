import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import PjblJadwal from '@/components/pjbl-jadwal';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelompok, Proyek, ProyekJadwal, ProyekJawaban } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

type SyntaxFourForm = {
    status_tahap_7: string;
    feedback_tahap_7: string;
};

export default function SyntaxFour() {
    const { currentSyntax, proyek, kelompok, jawaban, jadwals } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        jadwals?: ProyekJadwal[];
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

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxFourForm>>({
        status_tahap_7: 'diproses',
        feedback_tahap_7: '',
    });

    const handleOnSubmit = () => {
        patch(route('guru.proyek.updateNilai', { proyekId: proyek?.id, id: jawaban?.id, step: 7 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                status_tahap_7: jawaban.status_tahap_7 || '',
                feedback_tahap_7: jawaban.feedback_tahap_7 || '',
            }));
        }
    }, [jawaban]);

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                <PjblJadwal proyek={proyek} kelompok={kelompok} jadwals={jadwals} view />
                {jawaban && (
                    <React.Fragment>
                        <InputSelect
                            id="status_tahap_7"
                            label="Status"
                            placeholder="Pilih status"
                            required
                            options={statusOptions}
                            value={data.status_tahap_7}
                            onChange={(e) => setData('status_tahap_7', e.value)}
                            error={errors.status_tahap_7}
                        />
                        <InputQuill
                            id="feedback_tahap_7"
                            label="Feedback"
                            placeholder="Masukkan feedback anda"
                            required
                            value={data.feedback_tahap_7}
                            onChange={(value: string) => setData('feedback_tahap_7', value)}
                            error={errors.feedback_tahap_7}
                        />
                    </React.Fragment>
                )}
                <PjblFooter onSubmit={handleOnSubmit} disabled={processing} guru />
            </div>
        </AuthLayout>
    );
}
