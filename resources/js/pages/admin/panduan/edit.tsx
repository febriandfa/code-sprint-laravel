import InputField from '@/components/input-field';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Panduan } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';

type PanduanForm = {
    _method: 'PATCH' | 'POST';
    judul: string;
    file: File | null;
    role: string;
};

export default function EditPanduan() {
    const breadcrumbs = [
        {
            title: 'Materi',
            link: route('guru.materi.index'),
        },
        {
            title: 'Edit Materi',
            link: '#',
        },
    ];

    const fileRef = useRef<HTMLInputElement | null>(null);

    const { panduan } = usePage().props as { panduan?: Panduan };

    const { data, setData, post, processing, errors } = useForm<Required<PanduanForm>>({
        _method: 'PATCH',
        judul: panduan?.judul ?? '',
        file: null,
        role: panduan?.role ?? '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.panduan.update', panduan?.id), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthLayout title="Edit Panduan" breadcrumbs={breadcrumbs}>
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="judul"
                    label="Judul Panduan"
                    placeholder="Masukkan judul panduan"
                    required
                    disabled
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    error={errors.judul}
                />
                <InputField
                    id="file"
                    label="File Panduan"
                    type="file"
                    ref={fileRef}
                    value={panduan?.file}
                    onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                    error={errors.file}
                />
                <InputField
                    id="role"
                    label="Panduan Untuk"
                    placeholder="Pilih panduan ditunjukkan"
                    required
                    disabled
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    error={errors.role}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Panduan
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
