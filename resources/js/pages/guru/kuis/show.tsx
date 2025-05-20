import KuisTemplate from '@/components/kuis-template';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis, KuisSoal } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ShowKuis() {
    const { kuis, soals } = usePage().props as { kuis?: Kuis; soals?: KuisSoal[] };

    const breadcrumbs = [
        { title: 'Kuis', link: route('guru.kuis.index') },
        { title: kuis?.judul ?? 'Detail Kuis', link: '#' },
    ];

    console.log('kuis', kuis);
    console.log('soals', soals);

    return (
        <AuthLayout title={kuis?.judul ?? 'Kuis'} breadcrumbs={breadcrumbs}>
            {kuis && soals && <KuisTemplate kuis={kuis} soals={soals} view checkedBy="kuis_answer" />}
            <ul>{soals?.map((s) => <li key={s.id}>{s.soal}</li>)}</ul>
        </AuthLayout>
    );
}
