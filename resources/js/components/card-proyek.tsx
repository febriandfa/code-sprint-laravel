import { formatDate } from '@/lib/helper';
import Card from './ui/card';
import LabelStatus from './ui/label-status';

export default function CardProyek({
    title,
    proyekId,
    deadline,
    score,
    isCompleted,
    isProcessed,
    guru = false,
}: {
    title: string;
    proyekId: number;
    deadline: string;
    score: number | string;
    isCompleted: boolean;
    isProcessed: boolean;
    guru?: boolean;
}) {
    const routeShow = guru ? 'guru.proyek.show' : 'siswa.proyek.show';

    return (
        <Card title={title} content="project based learning" routeShow={route(routeShow, proyekId)}>
            <div className="grid grid-cols-2">
                <div>
                    <p className="flex justify-between pr-4">
                        Tenggat <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Nilai <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Status <span>:</span>
                    </p>
                </div>
                <div>
                    <p>{formatDate(deadline)}</p>
                    <p>{score}</p>
                    <span>
                        {isCompleted ? (
                            <LabelStatus status="Selesai" variant="success" size="small" />
                        ) : isProcessed ? (
                            <LabelStatus status="Belum Selesai" variant="warning" size="small" />
                        ) : (
                            <LabelStatus status="Belum Dikerjakan" variant="danger" size="small" />
                        )}
                    </span>
                </div>
            </div>
        </Card>
    );
}
