import AuthLayout from '@/layouts/auth-layout';
import { usePage } from '@inertiajs/react';

export default function SiswaKuis() {
    const { kuis, hasilSiswas } = usePage().props;

    return <AuthLayout title={``} index></AuthLayout>;
}
