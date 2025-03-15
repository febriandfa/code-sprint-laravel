import Swal from 'sweetalert2';

function SwalSuccess({ title = 'Berhasil!', text = 'Data berhasil ditambahkan' }: { title: string; text: string }) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

export { SwalSuccess };
