import { Kelompok, Proyek } from '@/types';
import { CircleCheck, Lock } from 'lucide-react';
import React from 'react';
import LabelStatus from './ui/label-status';
import Title from './ui/title';

export default function PjblHeader({ kelompok, proyek, currentSyntax }: { kelompok?: Kelompok; proyek?: Proyek; currentSyntax: number }) {
    const syntaxDatas = [
        { description: 'Identifikasi Masalah' },
        { description: 'Merencanakan Proyek' },
        { description: 'Membuat Jadwal Proyek' },
        { description: 'Pembuatan Proyek' },
    ];

    return (
        <React.Fragment>
            <Title title={kelompok?.nama ?? 'Kelompok'} className="mb-2" />
            <LabelStatus variant="danger" status={proyek?.tenggat ?? '-'} />
            <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-5">
                {syntaxDatas.map((data, index) => {
                    const isActive = index + 1 <= (currentSyntax ?? 1);
                    return (
                        <div
                            className={`w-60 rounded border p-2 text-lg font-medium ${isActive ? 'bg-primary-100 border-primary text-primary' : 'border-slate-100 bg-slate-100 text-gray-400'}`}
                        >
                            <p className="flex items-center gap-2">
                                Sintaks {index + 1}
                                {isActive && <CircleCheck size={18} />}
                                {!isActive && <Lock size={18} />}
                            </p>
                            <p>{data.description}</p>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}
