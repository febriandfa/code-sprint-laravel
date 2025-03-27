import { formatTwoDigit } from '@/lib/helper';
import { SwalSuccess } from '@/lib/swal';
import { Kuis, KuisSoal } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from './ui/button';
import RichText from './ui/rich-text';
import Title from './ui/title';

type KuisTemplateProps = {
    kuis: Kuis;
    soals: KuisSoal[];
    view?: boolean;
    checkedBy?: 'siswa_answer' | 'kuis_answer';
};

export default function KuisTemplate({ kuis, soals, view = false, checkedBy = 'siswa_answer' }: KuisTemplateProps) {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [currentSoal, setCurrentSoal] = useState<KuisSoal | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getInitialTimeRemaining = () => {
        if (view) return 0;

        const storedEndTime = localStorage.getItem(`kuis_${kuis?.id}_end_time`);

        if (storedEndTime) {
            const endTime = parseInt(storedEndTime, 10);
            const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
            return remaining;
        }

        const endTime = Date.now() + (kuis ? kuis.durasi * 60 * 1000 : 0);
        localStorage.setItem(`kuis_${kuis?.id}_end_time`, endTime.toString());
        return kuis ? kuis.durasi * 60 : 0;
    };

    const getStoredAnswers = () => {
        const storedAnswers = localStorage.getItem(`kuis_${kuis?.id}_answers`);
        return storedAnswers ? JSON.parse(storedAnswers) : {};
    };

    const [answers, setAnswers] = useState<{ [key: number]: string }>(getStoredAnswers());
    const [timeRemaining, setTimeRemaining] = useState(getInitialTimeRemaining);

    const { setData, post, processing } = useForm({
        kuis_id: kuis?.id,
        jawabans: answers,
    });

    useEffect(() => {
        setData('jawabans', answers);
    }, [answers]);

    const autoSubmit = useCallback(() => {
        if (isSubmitting || view) return;

        setIsSubmitting(true);
        post(route('siswa.kuis.answer'), {
            onSuccess: () => {
                SwalSuccess({
                    text: 'Waktu habis! Jawaban otomatis dikirim.',
                });
                localStorage.removeItem(`kuis_${kuis?.id}_answers`);
                localStorage.removeItem(`kuis_${kuis?.id}_end_time`);

                setTimeout(() => {
                    router.visit(route('siswa.kuis.index'));
                }, 1500);
            },
        });
    }, [kuis?.id, isSubmitting, post, view]);

    useEffect(() => {
        if (kuis && !view) {
            localStorage.setItem(`kuis_${kuis.id}_answers`, JSON.stringify(answers));
        }
    }, [answers, kuis, view]);

    useEffect(() => {
        if (soals && soals.length > 0) {
            const soal = soals.find((s) => s.urutan === currentNumber);
            setCurrentSoal(soal || null);
        }
    }, [currentNumber, soals]);

    useEffect(() => {
        if (view) return;

        const timer = setInterval(() => {
            const storedEndTime = localStorage.getItem(`kuis_${kuis?.id}_end_time`);

            if (storedEndTime) {
                const remaining = Math.max(0, Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000));
                setTimeRemaining(remaining);

                if (remaining <= 0 && !isSubmitting) {
                    clearInterval(timer);
                    localStorage.removeItem(`kuis_${kuis?.id}_end_time`);
                    autoSubmit();
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [kuis?.id, view]);

    const formatTimer = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentNumber < (soals?.length ?? 0)) {
            setCurrentNumber(currentNumber + 1);
        }
    };

    const handlePrevious = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1);
        }
    };

    const handleAnswerSelect = (label: string) => {
        if (view) return;

        if (currentSoal) {
            setAnswers((prev) => ({
                ...prev,
                [currentSoal.urutan]: label,
            }));
        }
    };

    const handleOnSubmit = () => {
        if (view) return;

        Swal.fire({
            title: 'Selesaikan Kuis?',
            text: 'Apakah anda yakin ingin menyelesaikan kuis?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Selesai',
            confirmButtonColor: '#3b82f6',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('siswa.kuis.answer'), {
                    onSuccess: () => {
                        SwalSuccess({ text: 'Jawaban berhasil dikirim!' });
                        localStorage.removeItem(`kuis_${kuis?.id}_answers`);
                        localStorage.removeItem(`kuis_${kuis?.id}_end_time`);

                        setTimeout(() => {
                            router.visit(route('siswa.kuis.index'));
                        }, 1500);
                    },
                });
            }
        });
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <span className="text-left">
                    <p className="text-slate-400">Soal</p>
                    <Title title={`${formatTwoDigit(currentNumber)}/${formatTwoDigit(soals?.length ?? 0)}`} />
                </span>
                {!view && (
                    <span className="text-right">
                        <p className="text-slate-400">Waktu</p>
                        <Title title={formatTimer(timeRemaining)} />
                    </span>
                )}
            </div>
            <div className="mt-6 space-y-4">
                {currentSoal?.lampiran && <img src={currentSoal?.lampiran} alt="Gambar Soal" className="object-cover" />}
                <RichText content={currentSoal?.soal} />
            </div>
            <div className="my-6 space-y-2">
                {currentSoal?.opsis.map((opsi, index) => {
                    let answerToCheck = answers[currentSoal.urutan];
                    if (checkedBy === 'kuis_answer') {
                        answerToCheck = currentSoal.jawaban;
                    }

                    return (
                        <label
                            key={index}
                            htmlFor={opsi.label}
                            className={`group hover:border-primary flex w-full items-center rounded-lg border px-6 py-4 text-left ${
                                answerToCheck === opsi.label ? 'bg-primary-100 border-primary' : ''
                            } ${view ? 'cursor-default' : 'hover:border-primary'}`}
                        >
                            <input
                                type="radio"
                                id={opsi.label}
                                name={`soal_${currentSoal.id}`}
                                value={opsi.label}
                                checked={answerToCheck === opsi.label}
                                onChange={() => handleAnswerSelect(opsi.label)}
                                disabled={view}
                                className={`group-hover:border-primary size-4 rounded-full border ${view ? 'cursor-not-allowed' : ''}`}
                            ></input>
                            <p className="mx-4">{opsi.label}.</p>
                            <RichText content={opsi.opsi} />
                        </label>
                    );
                })}
            </div>
            <div className={`flex items-center ${currentNumber === 1 ? 'justify-end' : 'justify-between'}`}>
                {currentNumber > 1 && (
                    <Button variant="outline-primary" onClick={handlePrevious}>
                        Sebelumnya
                    </Button>
                )}
                {currentNumber < (soals?.length ?? 0) && <Button onClick={handleNext}>Selanjutnya</Button>}
                {currentNumber === soals?.length && !view && (
                    <Button variant="primary" onClick={handleOnSubmit} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Selesai
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
}
