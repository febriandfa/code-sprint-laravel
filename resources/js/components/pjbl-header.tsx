import { Kelompok, Proyek, ProyekJawaban, ProyekNilai } from '@/types';
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

    const isCompleted = [canProceedToSyntax2, canProceedToSyntax3, canProceedToSyntax4, canProceedToSyntax5, canProceedToSyntax6, canProceedResult];
    const canProceedNextSyntax = [true, canProceedToSyntax2, canProceedToSyntax3, canProceedToSyntax4, canProceedToSyntax5, nilai !== null];

    useEffect(() => {
        if (jawaban) {
            setCanProceedToSyntax2(jawaban.status_tahap_4 === 'diterima');
            setCanProceedToSyntax3(jawaban.status_tahap_5 === 'diterima');
            setCanProceedToSyntax4(jawaban.status_tahap_6 === 'diterima');
            setCanProceedToSyntax5(jawaban.status_tahap_7 === 'diterima');
            setCanProceedToSyntax6(jawaban.status_tahap_8 === 'diterima');
            setCanProceedResult(nilai !== null);
        }
    }, [jawaban, nilai]);

    return (
        <React.Fragment>
            <Title title={kelompok?.nama ?? 'Kelompok'} className="mb-2" />
            <LabelStatus variant="danger" status={proyek?.tenggat ?? '-'} />
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
