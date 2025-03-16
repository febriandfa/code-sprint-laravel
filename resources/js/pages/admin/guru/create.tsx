import InputField from '@/components/input-field';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas, Mapel, OptionItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

type GuruForm = {
    name: string;
    email: string;
    kelas_id: string[];
    mapel_id: string[];
};

export default function CreateSiswa() {
    const breadcrumbs = [
        { title: 'Guru', link: route('admin.guru.index') },
        { title: 'Tambah Guru', link: '#' },
    ];

    const { kelases, mapels } = usePage().props as { kelases?: Kelas[]; mapels?: Mapel[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const mapelOptions = mapels?.map((mapel) => ({
        value: mapel.id,
        label: mapel.nama,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<Required<GuruForm>>({
        name: '',
        email: '',
        kelas_id: [],
        mapel_id: [],
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.guru.store'), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Guru berhasil ditambahkan' });
                reset();
            },
        });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <AuthLayout title="Tambah Guru" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                <InputField
                    id="name"
                    label="Nama Guru"
                    placeholder="Masukkan nama guru"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <InputField
                    id="email"
                    label="Email Guru"
                    placeholder="Masukkan email guru"
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
                    multi
                    options={kelasOptions}
                    value={data.kelas_id}
                    onChange={(e) =>
                        setData(
                            'kelas_id',
                            e.map((item: OptionItem) => item.value),
                        )
                    }
                    error={errors.kelas_id}
                />
                <InputSelect
                    id={'mapel_id'}
                    label={'Mata Pelajaran'}
                    placeholder={'Pilih mata pelajaran'}
                    required
                    multi
                    options={mapelOptions}
                    value={data.mapel_id}
                    onChange={(e) =>
                        setData(
                            'mapel_id',
                            e.map((item: OptionItem) => item.value),
                        )
                    }
                    error={errors.mapel_id}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Tambah Guru
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
