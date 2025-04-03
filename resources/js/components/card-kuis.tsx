import Card from './ui/card';
import LabelStatus from './ui/label-status';

export default function CardKuis({
    title,
    kuisId,
    isCompleted,
    totalSoal,
    duration,
    totalPoin,
    guru = false,
}: {
    title: string;
    kuisId: number;
    isCompleted: boolean;
    totalSoal: number;
    duration: number;
    totalPoin: number | string;
    guru?: boolean;
}) {
    const routeShow = guru ? 'guru.kuis.show' : 'siswa.kuis.show';

    return (
        <Card title={title} content="kuis" routeShow={route(routeShow, kuisId)} disabled={isCompleted} isKuis={!guru}>
            <div className="grid grid-cols-2">
                <div>
                    <p className="flex justify-between pr-4">
                        Soal <span>:</span>
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
                <div>
                    <p>{totalSoal}</p>
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
