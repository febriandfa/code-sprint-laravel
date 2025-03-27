import KuisTemplate from '@/components/kuis-template';
import AuthLayout from '@/layouts/auth-layout';
import { HasilKuis, Kuis, KuisJawaban, KuisSoal } from '@/types';
import { usePage } from '@inertiajs/react';

export default function JawabanKuis() {
    const { kuis, soals, hasilSiswa, jawabans } = usePage().props as {
        kuis?: Kuis;
        soals?: KuisSoal[];
        hasilSiswa?: HasilKuis;
        jawabans?: KuisJawaban[];
    };

    const breadcrumbs = [
        { title: 'Kuis', link: route('guru.kuis.index') },
        { title: 'Hasil Kuis', link: route('guru.kuis.siswa', hasilSiswa?.kuis_id) },
        { title: hasilSiswa?.nama_siswa ?? 'Siswa', link: '#' },
    ];

    return (
        <AuthLayout title={`Jawaban ${hasilSiswa?.nama_siswa ?? 'Siswa'}`} breadcrumbs={breadcrumbs}>
            {kuis && soals && jawabans && <KuisTemplate kuis={kuis} soals={soals} jawabans={jawabans} view checkedBy="hasil_answer" />}
        </AuthLayout>
    );
}
