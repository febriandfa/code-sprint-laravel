import InputQuill from '@/components/input-quill';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getProyekAnswerStatusInfo } from '@/lib/helper';
import { JoinedKelompok, Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type SyntaxTwoForm = {
    rencana_proyek: string;
};

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const siswaStatus = joinedKelompok?.status ?? 'anggota';
    const showSubmit = proyek?.status === 'berjalan' && jawaban?.status_tahap_5 !== 'diterima';

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { data, setData, patch, processing, errors } = useForm<Required<SyntaxTwoForm>>({
        rencana_proyek: '',
    });

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 5 }), {
            onSuccess: () => {},
        });
    };

    useEffect(() => {
        if (jawaban) {
            setData((prev) => ({
                ...prev,
                rencana_proyek: jawaban.jawaban_tahap_5 || '',
            }));
        }
    }, [jawaban]);

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <InputQuill
                    id="rencana_proyek"
                    label="Merencanakan Proyek"
                    placeholder="Masukkan jawaban anda"
                    required
                    value={data.rencana_proyek}
                    onChange={(value: string) => setData('rencana_proyek', value)}
                    error={errors.rencana_proyek}
                />
                <div>
                    <Label id={`status_tahap_5`} label="Status Pengerjaan" />
                    <LabelStatus variant={getProyekAnswerStatusInfo(5, jawaban).variant} status={getProyekAnswerStatusInfo(5, jawaban).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_5 && <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_5} />}

                {showSubmit && <PjblFooter role={siswaStatus} onSubmit={handleOnSubmit} disabled={processing} />}
            </div>
        </AuthLayout>
    );
}
