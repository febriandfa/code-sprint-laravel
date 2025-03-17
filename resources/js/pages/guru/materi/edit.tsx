import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelas, Mapel, Materi } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

type MateriForm = {
    _method: 'PATCH';
    kelas_id: string;
    mapel_id: string;
    judul: string;
    deskripsi: string;
    file_materi: File | null;
    file_modul: File | null;
};

export default function EditMateri() {
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

    const fileMateriRef = useRef<HTMLInputElement | null>(null);
    const fileModulRef = useRef<HTMLInputElement | null>(null);

    const { materi, kelases, mapels } = usePage().props as { materi?: Materi; kelases?: Kelas[]; mapels?: Mapel[] };

    const kelasOptions = kelases?.map((kelas) => ({
        value: kelas.id,
        label: kelas.nama,
    }));

    const mapelOptions = mapels?.map((mapel) => ({
        value: mapel.id,
        label: mapel.nama,
    }));

    const { data, setData, post, processing, errors } = useForm<Required<MateriForm>>({
        _method: 'PATCH',
        kelas_id: materi?.kelas_id.toString() ?? '',
        mapel_id: materi?.mapel_id.toString() ?? '',
        judul: materi?.judul ?? '',
        deskripsi: materi?.deskripsi ?? '',
        file_materi: null,
        file_modul: null,
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.materi.update', materi?.id), {
            onSuccess: () => {
                SwalSuccess({ title: 'Berhasil', text: 'Materi berhasil dirubah' });
            },
        });
    };

    console.log(data);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <AuthLayout title="Edit Materi" breadcrumbs={breadcrumbs}>
            <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
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
                <InputSelect
                    id={'mapel_id'}
                    label={'Mata Pelajaran'}
                    placeholder={'Pilih mata pelajaran'}
                    required
                    options={mapelOptions}
                    value={data.mapel_id}
                    onChange={(e) => setData('mapel_id', e.value)}
                    error={errors.mapel_id}
                />
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
                    ref={fileMateriRef}
                    value={materi?.file_materi}
                    onChange={(e) => setData('file_materi', e.target.files?.[0] ?? null)}
                    error={errors.file_materi}
                />
                <InputField
                    id="file_modul"
                    label="File Modul"
                    type="file"
                    ref={fileModulRef}
                    value={materi?.file_modul}
                    onChange={(e) => setData('file_modul', e.target.files?.[0] ?? null)}
                    error={errors.file_modul}
                />
                <div className="mt-3 w-fit">
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Ubah Materi
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
