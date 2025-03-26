import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { UserDetail } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type KelasForm = {
    nama: string;
    wali_kelas_id: string;
};

export default function CreateKelas() {
    const breadcrumbs = [
        { title: 'Kelas', link: route('admin.kelas.index') },
        { title: 'Tambah Kelas', link: '#' },
    ];

    const { waliKelases } = usePage().props as { waliKelases?: UserDetail[] };

    const waliKelasOptions = waliKelases?.map((wali) => ({
        value: wali.id,
        label: wali.name,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<KelasForm>>({
        nama: '',
        wali_kelas_id: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.kelas.store'), {
            onSuccess: () => {
                SwalSuccess({ content: 'kelas' });
                reset();
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
                    id={'wali_kelas_id'}
                    label={'Wali Kelas'}
                    placeholder={'Pilih wali kelas'}
                    options={waliKelasOptions}
                    value={data.wali_kelas_id}
                    onChange={(e) => setData('wali_kelas_id', e.value)}
                    error={errors.wali_kelas_id}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Kelas
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
