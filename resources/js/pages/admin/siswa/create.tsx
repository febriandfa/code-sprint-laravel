import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type SiswaForm = {
    name: string;
    email: string;
    kelas_id: string;
};

export default function CreateSiswa() {
    const breadcrumbs = [
        { title: 'Siswa', link: route('admin.siswa.index') },
        { title: 'Tambah Siswa', link: '#' },
    ];

    const { kelases } = usePage().props as { kelases?: Kelas[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<SiswaForm>>({
        name: '',
        email: '',
        kelas_id: '',
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.siswa.store'), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Siswa berhasil ditambahkan' });
                reset();
            },
        });
    };

    return (
        <AuthLayout title="Tambah Siswa" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="name"
                    label="Nama Siswa"
                    placeholder="Masukkan nama siswa"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <InputField
                    id="email"
                    label="Email Siswa"
                    placeholder="Masukkan email siswa"
                    type="email"
                    required
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
                <InputSelect
                    id={'kelas_id'}
                    label={'Kelas'}
                    placeholder={'Pilih kelas'}
                    required
                    options={kelasOptions}
                    value={data.kelas_id}
                    onChange={(e) => setData('kelas_id', e.value)}
                    error={errors.kelas_id}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Siswa
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
