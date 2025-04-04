import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function FlashMessage() {
    const { flash } = usePage().props as { flash?: { error: string; success: string; warning: string } };

    useEffect(() => {
        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: flash.error,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.error]);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: flash.success,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.warning) {
            Swal.fire({
                icon: 'info',
                title: 'Informasi',
                text: flash.warning,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, [flash?.warning]);

    return null;
}
