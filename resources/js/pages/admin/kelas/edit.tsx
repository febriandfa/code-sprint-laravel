import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas, UserDetail } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type KelasForm = {
    nama: string;
    guru_id: string;
};

export default function EditKelas() {
    const breadcrumbs = [
        { title: 'Kelas', link: route('admin.kelas.index') },
        { title: 'Edit Kelas', link: '#' },
    ];

    const { kelas, waliKelases } = usePage().props as { kelas?: Kelas; waliKelases?: UserDetail[] };

    const waliKelasOptions = waliKelases?.map((wali) => ({
        value: wali.id,
        label: wali.name,
    }));

    const { data, setData, patch, processing, errors } = useForm<Required<KelasForm>>({
        nama: kelas?.nama ?? '',
        guru_id: kelas?.guru_id ?? '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('admin.kelas.update', kelas?.id), {
            onSuccess: () => {
                SwalSuccess({ type: 'edit', content: 'kelas' });
            },
        });
    };

    return (
        <AuthLayout title="Tambah Kelas" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="nama"
                    label="Nama Kelas"
                    placeholder="Masukkan nama kelas"
                    required
                    autoFocus
                    autoComplete="nama-kelas"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    error={errors.nama}
                />
                <InputSelect
                    id={'guru_id'}
                    label={'Wali Kelas'}
                    placeholder={'Pilih wali kelas'}
                    required
                    options={waliKelasOptions}
                    value={data.guru_id}
                    onChange={(e) => setData('guru_id', e.value)}
                    error={errors.guru_id}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Kelas
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
