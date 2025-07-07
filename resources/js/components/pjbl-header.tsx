import { formatDateTime } from '@/lib/helper';
import { Kelompok, Proyek, ProyekJawaban, ProyekNilai, ProyekPertemuan } from '@/types';
import { Link } from '@inertiajs/react';
import { CircleCheck, Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import LabelStatus from './ui/label-status';
import Title from './ui/title';

export default function PjblHeader({
    kelompok,
    proyek,
    jawaban,
    nilai,
    currentSyntax,
    view = false,
}: {
    kelompok?: Kelompok;
    proyek?: Proyek;
    jawaban?: ProyekJawaban;
    nilai?: ProyekNilai;
    currentSyntax: number;
    view?: boolean;
}) {
    const syntaxDatas = [
        {
            description: 'Identifikasi Masalah',
            linkSiswa: route('siswa.proyek.syntaxOne', proyek?.id),
            linkGuru: route('guru.proyek.syntaxOne', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
        {
            description: 'Merencanakan Proyek',
            linkSiswa: route('siswa.proyek.syntaxTwo', proyek?.id),
            linkGuru: route('guru.proyek.syntaxTwo', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
        {
            description: 'Membuat Jadwal Proyek',
            linkSiswa: route('siswa.proyek.syntaxThree', proyek?.id),
            linkGuru: route('guru.proyek.syntaxThree', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
        {
            description: 'Pembuatan Proyek',
            linkSiswa: route('siswa.proyek.syntaxFour', proyek?.id),
            linkGuru: route('guru.proyek.syntaxFour', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
        {
            description: 'Hasil Proyek',
            linkSiswa: route('siswa.proyek.syntaxFive', proyek?.id),
            linkGuru: route('guru.proyek.syntaxFive', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
        {
            description: 'Evaluasi',
            linkSiswa: route('siswa.proyek.syntaxSix', proyek?.id),
            linkGuru: route('guru.proyek.syntaxSix', { proyekId: proyek?.id, kelompokId: kelompok?.id }),
        },
    ];

    const [canProceedToSyntax2, setCanProceedToSyntax2] = useState<boolean>(false);
    const [canProceedToSyntax3, setCanProceedToSyntax3] = useState<boolean>(false);
    const [canProceedToSyntax4, setCanProceedToSyntax4] = useState<boolean>(false);
    const [canProceedToSyntax5, setCanProceedToSyntax5] = useState<boolean>(false);
    const [canProceedToSyntax6, setCanProceedToSyntax6] = useState<boolean>(false);
    const [canProceedResult, setCanProceedResult] = useState<boolean>(false);

    const pertemuanList = [1, 2, 3, 4].map((i) => ({
        nama: proyek?.pertemuan[`nama_pertemuan_${i}` as keyof ProyekPertemuan],
        mulai: proyek?.pertemuan[`tanggal_mulai_${i}` as keyof ProyekPertemuan],
        selesai: proyek?.pertemuan[`tanggal_selesai_${i}` as keyof ProyekPertemuan],
    }));

    const canAccessBasedOnMeetingDate = (syntaxIndex: number): boolean => {
        if (view) return true;

        const today = new Date();

        let requiredMeetingIndex: number;
        switch (syntaxIndex) {
            case 0:
                requiredMeetingIndex = 0;
                break;
            case 1:
            case 2:
                requiredMeetingIndex = 1;
                break;
            case 3:
                requiredMeetingIndex = 2;
                break;
            case 4:
                requiredMeetingIndex = 3;
                break;
            case 5:
                requiredMeetingIndex = 3;
                break;
            default:
                return false;
        }

        const requiredMeeting = pertemuanList[requiredMeetingIndex];
        if (!requiredMeeting?.mulai) return false;

        return today >= new Date(requiredMeeting.mulai);
    };

    const canNilai = view ? true : nilai !== null || proyek?.status === 'selesai';
    const isCompleted = [canProceedToSyntax2, canProceedToSyntax3, canProceedToSyntax4, canProceedToSyntax5, canProceedToSyntax6, canProceedResult];
    const canProceedNextSyntax = [
        true,
        canProceedToSyntax2 && canAccessBasedOnMeetingDate(1),
        canProceedToSyntax3 && canAccessBasedOnMeetingDate(2),
        canProceedToSyntax4 && canAccessBasedOnMeetingDate(3),
        canProceedToSyntax5 && canAccessBasedOnMeetingDate(4),
        canNilai && canAccessBasedOnMeetingDate(5),
    ];

    useEffect(() => {
        if (jawaban) {
            setCanProceedToSyntax2(jawaban.status_tahap_4 === 'diterima' || proyek?.status === 'selesai');
            setCanProceedToSyntax3(jawaban.status_tahap_5 === 'diterima' || proyek?.status === 'selesai');
            setCanProceedToSyntax4(jawaban.status_tahap_6 === 'diterima' || proyek?.status === 'selesai');
            setCanProceedToSyntax5(jawaban.status_tahap_7 === 'diterima' || proyek?.status === 'selesai');
            setCanProceedToSyntax6(jawaban.status_tahap_8 === 'diterima' || proyek?.status === 'selesai');
            setCanProceedResult(canNilai);
        }
    }, [jawaban, nilai, canNilai, proyek?.status]);

    return (
        <React.Fragment>
            <div className="flex items-start justify-between">
                <div>
                    <Title title={kelompok?.nama ?? 'Kelompok'} className="mb-2" />
                    <LabelStatus variant="danger" status={proyek?.tenggat ?? '-'} />
                </div>
                <div>
                    <h4 className="text-base font-semibold">Status Pengerjaan Proyek</h4>
                    {jawaban && (
                        <div className="my-2 min-w-[120px]">
                            <div className="font-base mb-1 text-sm">
                                {(() => {
                                    const progressSteps = [
                                        { key: 'status_tahap_1', label: 'Sintaks 1 Tahap 1', percent: 0 },
                                        { key: 'status_tahap_2', label: 'Sintaks 1 Tahap 2', percent: 12.5 },
                                        { key: 'status_tahap_3', label: 'Sintaks 1 Tahap 3', percent: 25 },
                                        { key: 'status_tahap_4', label: 'Sintaks 1 Tahap 4', percent: 37.5 },
                                        { key: 'status_tahap_5', label: 'Sintaks 2', percent: 50 },
                                        { key: 'status_tahap_6', label: 'Sintaks 3', percent: 62.5 },
                                        { key: 'status_tahap_7', label: 'Sintaks 4', percent: 75 },
                                        { key: 'status_tahap_8', label: 'Sintaks 5', percent: 87.5 },
                                    ];

                                    let progres = { label: 'Sintaks 1 Tahap 1', percent: 0 };

                                    if (proyek?.refleksi && jawaban.status_tahap_8) {
                                        progres = { label: 'Evaluasi - Selesai', percent: 100 };
                                    } else {
                                        const latest = [...progressSteps].reverse().find((step) => jawaban[step.key as keyof ProyekJawaban]);
                                        if (latest) {
                                            progres = latest;
                                        }
                                    }

                                    return (
                                        <>
                                            Kemajuan Saat Ini: {progres.percent}%
                                            <div className="mt-1 h-2 w-full rounded bg-gray-200">
                                                <div
                                                    className={`h-full rounded transition-all duration-300 ${progres.percent === 100 ? 'bg-green-400' : 'bg-blue-500'}`}
                                                    style={{ width: `${progres.percent}%` }}
                                                />
                                            </div>
                                            <div className="mt-1 text-sm font-normal">Tahapan Saat Ini: {progres.label}</div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <div className="flex items-center gap-4 border-b-2 border-b-gray-300 py-5">
                    {pertemuanList.map((pertemuan, index) => {
                        const isActive = pertemuan.mulai && new Date(pertemuan.mulai) <= new Date();
                        const isPassed = pertemuan.selesai && new Date(pertemuan.selesai) < new Date();

                        return (
                            <div
                                key={index}
                                className={`min-w-60 rounded border p-2 text-lg font-medium ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                            >
                                <p className="flex items-center gap-2">
                                    {pertemuan.nama}
                                    {isPassed ? <CircleCheck size={18} /> : !isActive ? <Lock size={18} /> : null}
                                </p>
                                <p className="text-xs">
                                    {pertemuan.mulai ? formatDateTime(pertemuan.mulai) : '-'} -{' '}
                                    {pertemuan.selesai ? formatDateTime(pertemuan.selesai) : '-'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <div className="flex items-center gap-4 border-b-2 border-b-gray-300 py-5">
                    {syntaxDatas.map((data, index) => {
                        const isActive = index + 1 <= (currentSyntax ?? 1);
                        const canAccess = view || isActive || canProceedNextSyntax[index];
                        const linkToUse = view ? data.linkGuru : data.linkSiswa;

                        return (
                            <Link
                                key={index}
                                href={canAccess ? linkToUse : '#'}
                                className={`min-w-60 rounded border p-2 text-lg font-medium ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                            >
                                <p className="flex items-center gap-2">
                                    Sintaks {index + 1}
                                    {isCompleted[index] && <CircleCheck size={18} />}
                                    {!canAccess && !view && <Lock size={18} />}
                                </p>
                                <p>{data.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
