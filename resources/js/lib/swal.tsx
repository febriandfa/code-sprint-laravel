import Swal from 'sweetalert2';

function SwalSuccess({ type = 'create', content = 'data', text }: { type?: 'create' | 'edit'; content?: string; text?: string }) {
    Swal.fire({
        title: 'Berhasil',
        text: text ? text : `${content.charAt(0).toUpperCase() + content.slice(1)} berhasil ${type === 'edit' ? 'dirubah' : 'ditambahkan'}`,
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

export { SwalSuccess };
