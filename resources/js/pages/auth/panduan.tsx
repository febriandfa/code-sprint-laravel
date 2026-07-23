import Embed from '@/components/ui/embed';
import AuthLayout from '@/layouts/auth-layout';
import { Panduan } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ShowPanduan() {
    const { panduan } = usePage().props as { panduan?: Panduan };

    return (
        <AuthLayout title="Panduan" index>
            <Embed label="File Panduan" src={`/storage/${panduan?.file ?? ''}`} />
        </AuthLayout>
    );
}
