import Trash from '@/components/icons/trash';
import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis, KuisSoal } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

type KuisSoalForm = {
    _method: 'POST' | 'PATCH';
    soal: string;
    lampiran: File | null;
    hapus_lampiran: boolean;
    opsis: { label: string; opsi: string }[];
    jawaban: 'A' | 'B' | 'C' | 'D' | 'E';
    urutan: number;
    poin: number;
};

export default function SoalKuis() {
    const { kuis, soals } = usePage().props as { kuis?: Kuis; soals?: KuisSoal[] };
    const [currentNumber, setCurrentNumber] = useState(soals?.length ? 1 : 1);
    const [currentLampiran, setCurrentLampiran] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    console.log('kuis soal', kuis);
    console.log('soals soal', soals);

    const { data, setData, post, processing, errors } = useForm<Required<KuisSoalForm>>({
        _method: 'POST',
        soal: '',
        lampiran: null,
        hapus_lampiran: false,
        opsis: [
            { label: 'A', opsi: '' },
            { label: 'B', opsi: '' },
            { label: 'C', opsi: '' },
            { label: 'D', opsi: '' },
            { label: 'E', opsi: '' },
        ],
        urutan: (soals?.length ?? 0) + 1,
        jawaban: 'A',
        poin: 0,
    });

    const breadcrumbs = [
        { title: 'Kuis', link: route('guru.kuis.index') },
        { title: 'Tambah Soal', link: '#' },
    ];

    const jawabanOptions = [
        { value: 'A', label: 'Opsi A' },
        { value: 'B', label: 'Opsi B' },
        { value: 'C', label: 'Opsi C' },
        { value: 'D', label: 'Opsi D' },
        { value: 'E', label: 'Opsi E' },
    ];

    const poinOptions = Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: (i + 1).toString(),
    }));

    const lampiranRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const soalTerpilih = soals?.find((soal) => soal.urutan === currentNumber);
        setCurrentLampiran(soalTerpilih?.lampiran ?? null);
        if (soalTerpilih) {
            setIsEdit(true);
            setData({
                _method: 'PATCH',
                soal: soalTerpilih.soal,
                lampiran: null,
                hapus_lampiran: false,
                opsis: soalTerpilih.opsis,
                urutan: soalTerpilih.urutan,
                jawaban: soalTerpilih.jawaban,
                poin: soalTerpilih.poin,
            });
        } else {
            setIsEdit(false);
            setData((prevData) => ({
                ...prevData,
                _method: 'POST',
                soal: '',
                lampiran: null,
                hapus_lampiran: false,
                opsis: [
                    { label: 'A', opsi: '' },
                    { label: 'B', opsi: '' },
                    { label: 'C', opsi: '' },
                    { label: 'D', opsi: '' },
                    { label: 'E', opsi: '' },
                ],
                urutan: (soals?.length ?? 0) + 1,
                jawaban: 'A',
                poin: 0,
            }));
        }
    }, [currentNumber, soals, setData]);

    const handleChangeNumber = (number: number) => {
        setCurrentNumber(number);
    };

    const handleDeleteLampiran = () => {
        setCurrentLampiran(null);
        setData('hapus_lampiran', true);
    };

    const handleQuillOnChange = (index: number) => (value: string) => {
        setData((prevData) => ({
            ...prevData,
            opsis: prevData.opsis.map((opsi, i) => (i === index ? { ...opsi, opsi: value } : opsi)),
        }));
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(
            isEdit
                ? route('guru.kuis.soalUpdate', { kuisId: kuis?.id, soalId: soals?.find((soal) => soal.urutan === currentNumber)?.id })
                : route('guru.kuis.soalStore', kuis?.id),
            {
                onSuccess: () => {
                    if (lampiranRef.current) lampiranRef.current.value = '';
                },
            },
        );
    };

    const handleOnDelete = () => {
        Swal.fire({
            title: 'Hapus soal?',
            text: 'Soal yang dihapus tidak dapat dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route('guru.kuis.soalDestroy', { kuisId: kuis?.id, soalId: soals?.find((soal) => soal.urutan === currentNumber)?.id }),
                    {
                        onSuccess: () => {
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        },
                    },
                );
            }
        });
    };

    return (
        <AuthLayout title="Kuis" breadcrumbs={breadcrumbs}>
            <form className="grid grid-cols-7 gap-4" onSubmit={handleOnSubmit}>
                <div className="col-span-5 space-y-6">
                    <div className="border-primary space-y-6 rounded-lg border p-4">
                        <InputQuill
                            id="soal"
                            label={`Soal ${currentNumber}`}
                            placeholder="Masukkan soal"
                            required
                            value={data.soal}
                            onChange={(value: string) => setData('soal', value)}
                            error={errors.soal}
                        />
                        <div>
                            <InputField
                                id="file_modul"
                                label="File Lampiran"
                                type="file"
                                required
                                ref={lampiranRef}
                                onChange={(e) => setData('lampiran', e.target.files?.[0] ?? null)}
                                error={errors.lampiran}
                            />
                            {currentLampiran && (
                                <div className="relative mt-1 w-60">
                                    <img src={`/storage/${currentLampiran}`} alt="Lampiran Soal" className="w-full rounded" />
                                    <Button
                                        variant="danger"
                                        size="small"
                                        onClick={() => handleDeleteLampiran()}
                                        className="absolute top-0 right-0 rounded"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {data.opsis.map((opsi, index) => (
                                <InputQuill
                                    key={opsi.label}
                                    id={`opsi-${opsi.label}`}
                                    label={`Opsi ${opsi.label}`}
                                    placeholder={`Masukkan jawaban ${opsi.label}`}
                                    required
                                    value={opsi.opsi}
                                    onChange={handleQuillOnChange(index)}
                                    error={errors.opsis?.[index]}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <InputSelect
                                id={'jawaban'}
                                label={'Jawaban Benar'}
                                placeholder={'Pilih jawaban benar'}
                                required
                                options={jawabanOptions}
                                value={data.jawaban}
                                onChange={(e) => setData('jawaban', e.value)}
                                error={errors.jawaban}
                            />
                            <InputSelect
                                id={'mapel_id'}
                                label={'Poin'}
                                placeholder={'Pilih poin'}
                                required
                                options={poinOptions}
                                value={data.poin}
                                onChange={(e) => setData('poin', e.value)}
                                error={errors.poin}
                            />
                        </div>
                        <div>
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                            {isEdit && (
                                <Button type="button" variant="danger" onClick={handleOnDelete} className="mt-2 w-full">
                                    Hapus
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="border-primary grid grid-cols-5 gap-2 rounded-lg border p-3">
                        {Array.from({ length: (soals?.length ?? 0) + 1 }).map((_, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`flex items-center justify-center rounded border p-1 ${currentNumber === index + 1 ? 'bg-primary text-white' : 'border-slate-400 bg-gray-200'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChangeNumber(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
