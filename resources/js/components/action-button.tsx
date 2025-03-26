import { SwalSuccess } from '@/lib/swal';
import { Link, router } from '@inertiajs/react';
import { Eye, PenIcon, TrashIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from './ui/button';

type ActionButtonProps = {
    routeShow?: string;
    routeEdit?: string;
    routeDelete?: string;
};

export default function ActionButton({ routeShow, routeEdit, routeDelete }: ActionButtonProps) {
    const handleDeleteOnClick = () => {
        Swal.fire({
            title: 'Hapus data?',
            text: 'Data yang dihapus tidak dapat dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed && routeDelete) {
                router.delete(routeDelete, {
                    onSuccess: () => {
                        SwalSuccess({ text: 'Data berhasil dihapus' });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    },
                });
            }
        });
    };

    return (
        <div className="flex items-center space-x-1">
            {routeShow && (
                <Link href={routeShow}>
                    <Button variant="primary" size="small">
                        <Eye size="16px" />
                    </Button>
                </Link>
            )}
            {routeEdit && (
                <Link href={routeEdit}>
                    <Button variant="warning" size="small">
                        <PenIcon size="16px" />
                    </Button>
                </Link>
            )}
            {routeDelete && (
                <Button variant="danger" size="small" onClick={() => handleDeleteOnClick()}>
                    <TrashIcon size="16px" />
                </Button>
            )}
        </div>
    );
}
