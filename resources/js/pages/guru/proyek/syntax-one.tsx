import InputQuill from '@/components/input-quill';
import InputSelect from '@/components/input-select';
import PjblFooter from '@/components/pjbl-footer';
import PjblHeader from '@/components/pjbl-header';
import Button from '@/components/ui/button';
import Embed from '@/components/ui/embed';
import RichTextView from '@/components/ui/rich-text-view';
import AuthLayout from '@/layouts/auth-layout';
import { SwalSuccess } from '@/lib/swal';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type StepOneForm = {
    status_tahap_2: string;
    feedback_tahap_2: string;
};

type StepTwoForm = {
    status_tahap_3: string;
    feedback_tahap_3: string;
};

type StepThreeForm = {
    status_tahap_4: string;
    feedback_tahap_4: string;
};

type FormData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
    statusField: keyof StepOneForm | keyof StepTwoForm | keyof StepThreeForm;
    feedbackField: keyof StepOneForm | keyof StepTwoForm | keyof StepThreeForm;
};

export default function SyntaxOne() {
    const { currentSyntax, proyek, kelompok, jawaban, nilai } = usePage().props as {
        currentSyntax?: number;
        proyek?: Proyek;
        kelompok?: Kelompok;
        jawaban?: ProyekJawaban;
        nilai?: ProyekNilai;
    };

    const [currentStep, setCurrentStep] = useState<number>(1);

    const breadcrumbs = [
        { title: 'Project Based Learning', link: route('guru.proyek.index') },
        { title: 'Detail Project Based Learning', link: route('guru.proyek.show', proyek?.id) },
        { title: `Progress Kelompok ${kelompok?.nama}`, link: '#' },
    ];

    const stepDatas = [
        { description: 'Orientasi Masalah' },
        { description: 'Rumusan Masalah' },
        { description: 'Menentukan Indikator' },
        { description: 'Analisis Masalah' },
    ];

    const statusOptions = [
        { value: 'diterima', label: 'Terima' },
        { value: 'direvisi', label: 'Revisi' },
        { value: 'ditolak', label: 'Tolak' },
    ];

    const {
        data: dataOne,
        setData: setDataOne,
        patch: patchOne,
        processing: processingOne,
        errors: errorsOne,
    } = useForm<Required<StepOneForm>>({
        status_tahap_2: '',
        feedback_tahap_2: '',
    });

    const {
        data: dataTwo,
        setData: setDataTwo,
        patch: patchTwo,
        processing: processingTwo,
        errors: errorsTwo,
    } = useForm<Required<StepTwoForm>>({
        status_tahap_3: '',
        feedback_tahap_3: '',
    });

    const {
        data: dataThree,
        setData: setDataThree,
        post: postThree,
        processing: processingThree,
        errors: errorsThree,
    } = useForm<Required<StepThreeForm>>({
        status_tahap_4: '',
        feedback_tahap_4: '',
    });

    const isProcessing = processingOne || processingTwo || processingThree;

    const handleOnSubmit = () => {
        switch (currentStep) {
            case 2:
                submitStepOne();
                break;
            case 3:
                submitStepTwo();
                break;
            case 4:
                submitStepThree();
                break;
            default:
                break;
        }
    };

    const submitStepOne = () => {
        patchOne(route('guru.proyek.updateNilai', { proyekId: proyek?.id, id: jawaban?.id, step: 2 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    const submitStepTwo = () => {
        patchTwo(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 3 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
            },
        });
    };

    const submitStepThree = () => {
        postThree(route('siswa.proyek.updateAnswer', { proyekId: proyek?.id, id: jawaban?.id, step: 4 }), {
            onSuccess: () => {
                SwalSuccess({ text: 'Berhasil menyimpan nilai!' });
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

    const handleJumpStep = (step: number) => {
        if (step > 0 && step <= stepDatas.length) {
            setCurrentStep(step);
        }
    };

    const isCompleted = [true, jawaban?.jawaban_tahap_2, jawaban?.jawaban_tahap_3, jawaban?.jawaban_tahap_4];

    const getCurrentFormData = (): FormData | null => {
        switch (currentStep) {
            case 2:
                return {
                    data: dataOne,
                    setData: setDataOne,
                    errors: errorsOne,
                    statusField: 'status_tahap_2',
                    feedbackField: 'feedback_tahap_2',
                };
            case 3:
                return {
                    data: dataTwo,
                    setData: setDataTwo,
                    errors: errorsTwo,
                    statusField: 'status_tahap_3',
                    feedbackField: 'feedback_tahap_3',
                };
            case 4:
                return {
                    data: dataThree,
                    setData: setDataThree,
                    errors: errorsThree,
                    statusField: 'status_tahap_4',
                    feedbackField: 'feedback_tahap_4',
                };
            default:
                return null;
        }
    };

    const currentFormData = getCurrentFormData();

    useEffect(() => {
        if (jawaban) {
            setDataOne((prev) => ({
                ...prev,
                status_tahap_2: jawaban.status_tahap_2 || '',
                feedback_tahap_2: jawaban.feedback_tahap_2 || '',
            }));

            setDataTwo((prev) => ({
                ...prev,
                status_tahap_3: jawaban.status_tahap_3 || '',
                feedback_tahap_3: jawaban.feedback_tahap_3 || '',
            }));

            setDataThree((prev) => ({
                ...prev,
                status_tahap_4: jawaban.status_tahap_4 || '',
                feedback_tahap_4: jawaban.feedback_tahap_4 || '',
            }));
        }
    }, [jawaban]);

    return (
        <AuthLayout title="Project Based Learning" breadcrumbs={breadcrumbs}>
            <PjblHeader proyek={proyek} kelompok={kelompok} jawaban={jawaban} nilai={nilai} currentSyntax={currentSyntax ?? 1} view />
            <div className="my-5 space-y-6">
                <div className="item-center flex gap-6">
                    {stepDatas.map((data, index) => {
                        const isActive = index + 1 <= (currentStep ?? 1);

                        return (
                            <div
                                onClick={() => handleJumpStep(index + 1)}
                                className={`w-48 cursor-pointer rounded border p-2 ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                            >
                                <p className="flex items-center gap-2 font-medium">
                                    Tahap {index + 1}
                                    {isCompleted[index] && <CircleCheck size={18} />}
                                </p>
                                <p>{data.description}</p>
                            </div>
                        );
                    })}
                </div>
                {currentStep === 1 && <RichTextView label="Studi Kasus" value={kelompok?.masalah} />}
                {currentStep === 2 && <RichTextView label="Rumusan Masalah" value={jawaban?.jawaban_tahap_2} />}
                {currentStep === 3 && <RichTextView label="Menentukan Indikator" value={jawaban?.jawaban_tahap_3} />}
                {currentStep === 4 && <Embed label="Analisis Masalah" src={jawaban?.jawaban_tahap_4 ?? ''} />}
                {currentStep !== 1 && (
                    <React.Fragment>
                        {jawaban && currentFormData && (
                            <React.Fragment>
                                <InputSelect
                                    id={`status_tahap_${currentStep}`}
                                    label="status"
                                    placeholder="Pilih status"
                                    required
                                    options={statusOptions}
                                    value={currentFormData.data[currentFormData.statusField]}
                                    onChange={(e) => currentFormData.setData(currentFormData.statusField, e.value)}
                                    error={currentFormData.errors[currentFormData.statusField]}
                                />
                                <InputQuill
                                    id={`feedback_tahap_${currentStep}`}
                                    label="Feedback"
                                    placeholder="Masukkan feedback anda"
                                    required
                                    value={currentFormData.data[currentFormData.feedbackField]}
                                    onChange={(value: string) => currentFormData.setData(currentFormData.feedbackField, value)}
                                    error={currentFormData.errors[currentFormData.feedbackField]}
                                />
                            </React.Fragment>
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
                            <Button onClick={handleNextStep} disabled={isProcessing}>
                                Berikutnya
                            </Button>
                        )}
                    </div>
                    {currentStep > 1 && <PjblFooter onSubmit={handleOnSubmit} disabled={isProcessing} guru />}
                </div>
            </div>
        </AuthLayout>
    );
}
