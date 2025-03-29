import InputField from '@/components/input-field';
import InputQuill from '@/components/input-quill';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import LabelStatus from '@/components/ui/label-status';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { JoinedKelompok, Kelompok, Proyek } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CircleCheck, LoaderCircle, Lock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type StepOneForm = {
    kelompok_id?: string;
    rumusan_masalah?: string;
};

type StepTwoForm = {
    indikator?: string;
};

type StepThreeForm = {
    _method?: 'POST' | 'PATCH';
    analisis_masalah?: File | null;
};

export default function SyntaxOneProyek() {
    const { currentSyntax, proyek, kelompok, joinedKelompok, jawaban } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        joinedKelompok?: JoinedKelompok;
        jawaban?: any;
    };

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [canProceedToStep3, setCanProceedToStep3] = useState<boolean>(false);
    const [canProceedToStep4, setCanProceedToStep4] = useState<boolean>(false);
    const siswaStatus = joinedKelompok?.status ?? 'anggota';
    const analisisMasalahRef = useRef<HTMLInputElement | null>(null);

    console.log('jawaban', jawaban);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('siswa.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('siswa.proyek.show', proyek?.id) },
        { title: 'Pengerjaan Project Based Learning', link: '#' },
    ];

    const stepDatas = [
        { description: 'Orientasi Masalah' },
        { description: 'Rumusan Masalah' },
        { description: 'Menentukan Indikator' },
        { description: 'Analisis Masalah' },
    ];

    const {
        data: dataOne,
        setData: setDataOne,
        post: postOne,
        patch: patchOne,
        processing: processingOne,
        errors: errorsOne,
    } = useForm<Required<StepOneForm>>({
        kelompok_id: kelompok?.id.toString() ?? '',
        rumusan_masalah: '',
    });

    const {
        data: dataTwo,
        setData: setDataTwo,
        patch: patchTwo,
        processing: processingTwo,
        errors: errorsTwo,
    } = useForm<Required<StepTwoForm>>({
        indikator: '',
    });

    const {
        data: dataThree,
        setData: setDataThree,
        post: postThree,
        processing: processingThree,
        errors: errorsThree,
    } = useForm<Required<StepThreeForm>>({
        _method: 'PATCH',
        analisis_masalah: null,
    });

    const isProcessing = processingOne || processingTwo || processingThree;

    const handleOnSubmit = () => {
        switch (currentStep) {
            case 2:
                submitRumusanMasalah();
                break;
            case 3:
                submitIndikator();
                break;
            case 4:
                submitAnalisisMasalah();
                break;
            default:
                break;
        }
    };

    const submitRumusanMasalah = () => {
        const method = jawaban ? patchOne : postOne;
        const routeName = jawaban
            ? route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, answerId: jawaban?.id, step: 2 })
            : route('siswa.proyek.storeAnswer', proyek?.id);
        method(routeName, {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    const submitIndikator = () => {
        patchTwo(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, answerId: jawaban?.id, step: 3 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    const submitAnalisisMasalah = () => {
        postThree(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, answerId: jawaban?.id, step: 4 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil mengirimkan jawaban!' });
            },
        });
    };

    const handleNextStep = () => {
        if (currentStep < stepDatas.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    useEffect(() => {
        if (jawaban) {
            setDataOne((prev) => ({
                ...prev,
                rumusan_masalah: jawaban.jawaban_tahap_2 || '',
            }));

            setDataTwo((prev) => ({
                ...prev,
                indikator: jawaban.jawaban_tahap_3 || '',
            }));

            setCanProceedToStep3(jawaban.status_tahap_2 === 'diterima');
            setCanProceedToStep4(jawaban.status_tahap_3 === 'diterima');
        }
    }, [jawaban]);

    const getStatusInfo = (step: number) => {
        if (!jawaban || !jawaban[`status_tahap_${step}`]) {
            return { variant: 'default' as const, text: 'Sedang Mengerjakan' };
        }

        const status = jawaban[`status_tahap_${step}`] as keyof typeof statusMap;

        const statusMap = {
            diterima: { variant: 'success' as const, text: 'Jawaban Diterima' },
            ditolak: { variant: 'danger' as const, text: 'Jawaban Ditolak' },
            direvisi: { variant: 'warning' as const, text: 'Perlu Direvisi' },
        };

        return statusMap[status] || { variant: 'info' as const, text: 'Sedang Diproses' };
    };

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader kelompok={kelompok} proyek={proyek} currentSyntax={currentSyntax ?? 1} />
            <div className="my-5 space-y-6">
                <div className="item-center flex gap-6">
                    {stepDatas.map((data, index) => {
                        const isActive = index + 1 <= (currentStep ?? 1);
                        return (
                            <div
                                className={`w-48 rounded border p-2 ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                            >
                                <p className="flex items-center gap-2 font-medium">
                                    Tahap {index + 1}
                                    {isActive && <CircleCheck size={18} />}
                                    {!isActive && <Lock size={18} />}
                                </p>
                                <p>{data.description}</p>
                            </div>
                        );
                    })}
                </div>
                {currentStep === 1 && <RichTextView label="Studi Kasus" value={kelompok?.masalah} />}
                {currentStep === 2 && (
                    <InputQuill
                        id="rumusan_masalah"
                        label="Rumusan Masalah"
                        placeholder="Masukkan jawaban anda"
                        value={dataOne.rumusan_masalah}
                        onChange={(value: string) => setDataOne('rumusan_masalah', value)}
                        error={errorsOne.rumusan_masalah}
                    />
                )}
                {currentStep === 3 && (
                    <InputQuill
                        id="indikator"
                        label="Menentukan Indikator"
                        placeholder="Masukkan jawaban anda"
                        value={dataTwo.indikator}
                        onChange={(value: string) => setDataTwo('indikator', value)}
                        error={errorsTwo.indikator}
                    />
                )}
                {currentStep === 4 && (
                    <div>
                        <InputField
                            id="analisis_masalah"
                            label="Analisis Masalah"
                            type="file"
                            ref={analisisMasalahRef}
                            onChange={(e) => setDataThree('analisis_masalah', e.target.files?.[0] ?? null)}
                            error={errorsThree.analisis_masalah}
                        />
                        {dataThree.analisis_masalah && typeof dataThree.analisis_masalah === 'object' && (
                            <p>File terpilih: {dataThree.analisis_masalah.name}</p>
                        )}
                    </div>
                )}
                {currentStep !== 1 && (
                    <React.Fragment>
                        <div>
                            <Label id={`status_tahap_${currentStep}`} label="Status Pengerjaan" />
                            <LabelStatus variant={getStatusInfo(currentStep).variant} status={getStatusInfo(currentStep).text} />
                        </div>
                        {jawaban && jawaban[`feedback_tahap_${currentStep}`] && (
                            <div>
                                <RichTextView label="Feedback Guru" value={jawaban[`feedback_tahap_${currentStep}`]} />
                            </div>
                        )}
                    </React.Fragment>
                )}
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        {currentStep > 1 && (
                            <Button variant="outline-primary" onClick={handlePrevStep}>
                                Sebelumnya
                            </Button>
                        )}
                        {currentStep < stepDatas.length && (
                            <Button
                                onClick={handleNextStep}
                                disabled={isProcessing || (currentStep === 2 && !canProceedToStep3) || (currentStep === 3 && !canProceedToStep4)}
                            >
                                Berikutnya
                            </Button>
                        )}
                    </div>
                    {siswaStatus === 'ketua' && currentStep > 1 && (
                        <div className="flex gap-2">
                            <Button variant="outline-primary">Edit</Button>
                            <Button onClick={handleOnSubmit} disabled={isProcessing}>
                                {isProcessing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Kirim
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
