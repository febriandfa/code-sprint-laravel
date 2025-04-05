import InputField from '@/components/input-field';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function SyntaxSixProyek() {
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
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const subNilaiKeys = [
        { key: 'nilai_orientasi_masalah', label: 'Orientasi Masalah' },
        { key: 'nilai_kerja_sama', label: 'Kerja Sama' },
        { key: 'nilai_proses', label: 'Proses' },
        { key: 'nilai_waktu', label: 'Waktu' },
        { key: 'nilai_hasil_proyek', label: 'Hasil Proyek' },
    ];

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <div>
                    <div className="flex gap-4">
                        {subNilaiKeys.map(({ key, label }) => (
                            <InputField key={key} id={key} label={label} value={nilai?.[key] ?? 'Belum dinilai'} disabled />
                        ))}
                    </div>
                    <p className="text-xs text-gray-400">Indeks Nilai 0-5</p>
                </div>
                <InputField id="nilai" label="Nilai" value={nilai?.nilai ?? 'Belum dinilai'} disabled />
                <RichTextView label="Evaluasi" value={nilai?.evaluasi ?? '<p>Tidak ada evaluasi</p>'} />
                {jawaban && proyek?.refleksi && (
                    <div>
                        <RichTextView label="Refleksi" value={proyek?.refleksi} />
                    </div>
                )}
                <div className="flex justify-end">
                    <Button onClick={() => router.visit(route('siswa.proyek.index'))}>Selesai</Button>
                </div>
            </div>
        </AuthLayout>
    );
}
