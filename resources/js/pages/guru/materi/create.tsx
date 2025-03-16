import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

type MateriForm = {
    judul: string;
    deskripsi: string;
    file_materi: File | null;
    file_modul: File | null;
};

export default function CreateMateri() {
    const breadcrumbs = [
        {
            title: 'Materi',
            link: route('guru.materi.index'),
        },
        {
            title: 'Tambah materi',
            link: '#',
        },
    ];

    const fileMateriRef = useRef<HTMLInputElement | null>(null);
    const fileModulRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<MateriForm>>({
        judul: '',
        deskripsi: '',
        file_materi: null,
        file_modul: null,
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.materi.store'), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Materi berhasil ditambahkan' });
                if (fileMateriRef.current) fileMateriRef.current.value = '';
                if (fileModulRef.current) fileModulRef.current.value = '';
                reset();
            },
        });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <AuthLayout title="Tambah Materi" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="judul"
                    label="Nama Materi"
                    placeholder="Masukkan judul materi"
                    required
                    autoFocus
                    autoComplete="judul"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    error={errors.judul}
                />
                <InputQuill
                    id="deskripsi"
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi materi"
                    value={data.deskripsi}
                    onChange={(value: string) => setData('deskripsi', value)}
                    error={errors.deskripsi}
                />
                <InputField
                    id="file_materi"
                    label="File Materi"
                    type="file"
                    required
                    ref={fileMateriRef}
                    onChange={(e) => setData('file_materi', e.target.files?.[0] ?? null)}
                    error={errors.file_materi}
                />
                <InputField
                    id="file_modul"
                    label="File Modul"
                    type="file"
                    required
                    ref={fileModulRef}
                    onChange={(e) => setData('file_modul', e.target.files?.[0] ?? null)}
                    error={errors.file_modul}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Materi
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
