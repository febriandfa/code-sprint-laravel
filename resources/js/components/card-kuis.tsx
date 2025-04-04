import { formatDateTime } from '@/lib/helper';
import Card from './ui/card';
import LabelStatus from './ui/label-status';

export default function CardKuis({
    title,
    kuisId,
    isCompleted,
    totalSoal,
    duration,
    totalPoin,
    startDate,
    endDate,
    guru = false,
}: {
    title: string;
    kuisId: number;
    isCompleted: boolean;
    totalSoal: number;
    duration: number;
    totalPoin: number | string;
    startDate: string;
    endDate: string;
    guru?: boolean;
}) {
    const routeShow = guru ? route('guru.kuis.show', kuisId) : isCompleted ? route('siswa.kuis.hasil', kuisId) : route('siswa.kuis.show', kuisId);

    const now = new Date();
    const start = new Date(startDate);

    const isOutOfRange = now < start;

    return (
        <Card title={title} content="kuis" routeShow={routeShow} disabled={isOutOfRange} isKuis={guru ? false : isCompleted ? false : true}>
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <p className="flex justify-between pr-4">
                        Soal <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Dimulai <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Selesai <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Waktu <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Nilai <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Status <span>:</span>
                    </p>
                </div>
                <div className="col-span-2">
                    <p>{totalSoal}</p>
                    <p>{formatDateTime(startDate)}</p>
                    <p>{formatDateTime(endDate)}</p>
                    <p>{duration} Menit</p>
                    <p>{totalPoin}</p>
                    <span>
                        {isCompleted ? (
                            <LabelStatus status="Selesai" variant="success" size="small" />
                        ) : (
                            <LabelStatus status="Belum Dikerjakan" variant="warning" size="small" />
                        )}
                    </span>
                </div>
            </div>
        </Card>
    );
}
