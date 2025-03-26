import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import Button from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Kuis, KuisSoal } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type KuisSoalForm = {
    soal: string;
    lampiran: File | null;
    opsis: { label: string; opsi: string }[];
    jawaban: 'A' | 'B' | 'C' | 'D' | 'E';
    urutan: number;
    poin: number;
};

export default function SoalKuis() {
    const { kuis, soals } = usePage().props as { kuis?: Kuis; soals?: KuisSoal[] };
    const [currentNumber, setCurrentNumber] = useState(soals?.length ? 1 : 1);
    const [currentLampiran, setCurrentLampiran] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<Required<KuisSoalForm>>({
        soal: '',
        lampiran: null,
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

    const poinOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
    ];

    const fileModulRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const soalTerpilih = soals?.find((soal) => soal.urutan === currentNumber);
        setCurrentLampiran(soalTerpilih?.lampiran ?? null);
        if (soalTerpilih) {
            setData({
                soal: soalTerpilih.soal,
                lampiran: null,
                opsis: soalTerpilih.opsis,
                urutan: soalTerpilih.urutan,
                jawaban: soalTerpilih.jawaban,
                poin: soalTerpilih.poin,
            });
        } else {
            setData((prevData) => ({
                ...prevData,
                soal: '',
                lampiran: null,
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

    const handleQuillOnChange = (index: number) => (value: string) => {
        setData((prevData) => ({
            ...prevData,
            opsis: prevData.opsis.map((opsi, i) => (i === index ? { ...opsi, opsi: value } : opsi)),
        }));
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('guru.kuis.soalStore', kuis?.id));
    };

    return (
        <AuthLayout title="Kuis" breadcrumbs={breadcrumbs}>
            <form className="grid grid-cols-7 gap-4" onSubmit={handleOnSubmit}>
                <div className="col-span-5 flex flex-col gap-6">
                    <div className="border-primary flex flex-col gap-6 rounded-lg border p-4">
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
                                ref={fileModulRef}
                                onChange={(e) => setData('lampiran', e.target.files?.[0] ?? null)}
                                error={errors.lampiran}
                            />
                            {currentLampiran && <img src={currentLampiran} alt="Lampiran Soal" className="mt-1 w-60 rounded-lg" />}
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
                        <Button type="submit" disabled={processing} className="w-full">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
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
