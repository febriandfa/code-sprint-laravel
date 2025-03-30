import { Kelompok, Proyek, ProyekJawaban } from '@/types';
import { Link } from '@inertiajs/react';
import { CircleCheck, Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import LabelStatus from './ui/label-status';
import Title from './ui/title';

export default function PjblHeader({
    kelompok,
    proyek,
    jawaban,
    currentSyntax,
}: {
    kelompok?: Kelompok;
    proyek?: Proyek;
    jawaban?: ProyekJawaban;
    currentSyntax: number;
}) {
    const syntaxDatas = [
        { description: 'Identifikasi Masalah', link: route('siswa.proyek.syntaxOne', proyek?.id) },
        { description: 'Merencanakan Proyek', link: route('siswa.proyek.syntaxTwo', proyek?.id) },
        { description: 'Membuat Jadwal Proyek', link: route('siswa.proyek.syntaxThree', proyek?.id) },
        { description: 'Pembuatan Proyek', link: route('siswa.proyek.syntaxFour', proyek?.id) },
    ];

    const [canProceedToSyntax2, setCanProceedToSyntax2] = useState<boolean>(false);
    const [canProceedToSyntax3, setCanProceedToSyntax3] = useState<boolean>(false);
    const [canProceedToSyntax4, setCanProceedToSyntax4] = useState<boolean>(false);
    const [canProceedToSyntax5, setCanProceedToSyntax5] = useState<boolean>(false);

    const isCompleted = [canProceedToSyntax2, canProceedToSyntax3, canProceedToSyntax4, canProceedToSyntax5];
    const canProceedNextSyntax = [true, ...isCompleted];

    useEffect(() => {
        if (jawaban) {
            setCanProceedToSyntax2(jawaban.status_tahap_4 === 'diterima');
            setCanProceedToSyntax3(jawaban.status_tahap_5 === 'diterima');
            setCanProceedToSyntax4(jawaban.status_tahap_6 === 'diterima');
            setCanProceedToSyntax5(jawaban.status_tahap_7 === 'diterima');
        }
    }, [jawaban]);

    return (
        <React.Fragment>
            <Title title={kelompok?.nama ?? 'Kelompok'} className="mb-2" />
            <LabelStatus variant="danger" status={proyek?.tenggat ?? '-'} />
            <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-5">
                {syntaxDatas.map((data, index) => {
                    const isActive = index + 1 <= (currentSyntax ?? 1);
                    return (
                        <Link
                            key={index}
                            href={isActive || canProceedNextSyntax[index] ? data.link : '#'}
                            className={`w-60 rounded border p-2 text-lg font-medium ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                        >
                            <p className="flex items-center gap-2">
                                Sintaks {index + 1}
                                {isCompleted[index] && <CircleCheck size={18} />}
                                {!isActive && !canProceedNextSyntax[index] && <Lock size={18} />}
                            </p>
                            <p>{data.description}</p>
                        </Link>
                    );
                })}
            </div>
        </React.Fragment>
    );
}
