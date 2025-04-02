import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import PjblJadwal from '@/components/pjbl-jadwal';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { getProyekAnswerStatusInfo } from '@/lib/helper';
import { Auth, JoinedKelompok, Kelompok, Proyek, ProyekJadwal, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

export default function SyntaxTwoProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban, jadwals, auth, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: ProyekJawaban;
        jadwals?: ProyekJadwal[];
        auth?: Auth;
        nilai?: ProyekNilai;
    };

    const siswaStatus = joinedKelompok?.status ?? 'anggota';
    const showSubmit = proyek?.status === 'berjalan' && jawaban?.status_tahap_7 !== 'diterima';

    console.log('kelompok', kelompok);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const { patch, processing } = useForm();

    const handleOnSubmit = () => {
        patch(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 7 }), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <PjblJadwal proyek={proyek} kelompok={kelompok} jadwals={jadwals} auth={auth} joinedKelompok={joinedKelompok} />
                <div>
                    <Label id={`status_tahap_7`} label="Status Pengerjaan" />
                    <LabelStatus variant={getProyekAnswerStatusInfo(7, jawaban).variant} status={getProyekAnswerStatusInfo(7, jawaban).text} />
                </div>
                {jawaban && jawaban.feedback_tahap_7 && <RichTextView label="Feedback Guru" value={jawaban.feedback_tahap_7} />}

                {showSubmit && <PjblFooter role={siswaStatus} onSubmit={handleOnSubmit} disabled={processing} />}
            </div>
        </AuthLayout>
    );
}
