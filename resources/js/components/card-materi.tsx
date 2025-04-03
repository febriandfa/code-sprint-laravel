import { formatDate, stripHtml } from '@/lib/helper';
import Card from './ui/card';
import LabelStatus from './ui/label-status';

export default function CardMateri({
    title,
    materiId,
    description,
    createdAt,
    isRead,
}: {
    title: string;
    materiId: number;
    description: string;
    createdAt: string;
    isRead: boolean;
}) {
    return (
        <Card title={title} content="materi" routeShow={route('siswa.materi.show', materiId)}>
            <p className="line-clamp-3 text-justify">{stripHtml(description)}</p>
            <div className="grid grid-cols-2">
                <div>
                    <p className="flex justify-between pr-4">
                        Diupload <span>:</span>
                    </p>
                    <p className="flex justify-between pr-4">
                        Status <span>:</span>
                    </p>
                </div>
                <div>
                    <p>{formatDate(createdAt)}</p>
                    <span>
                        {isRead ? (
                            <LabelStatus status="Dipelajari" variant="success" size="small" />
                        ) : (
                            <LabelStatus status="Belum Dipelajari" variant="warning" size="small" />
                        )}
                    </span>
                </div>
            </div>
        </Card>
    );
}
