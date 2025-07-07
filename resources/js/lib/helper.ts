import { ProyekJawaban } from '@/types';

export const stripHtml = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
};

export const formatDateTime = (dateString: string | Date | number) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const parts = new Intl.DateTimeFormat('id-ID', options).formatToParts(date);

    const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

    const day = getPart('day');
    const month = getPart('month');
    const year = getPart('year');
    const hour = getPart('hour');
    const minute = getPart('minute');

    return `${day}/${month}/${year} ${hour}:${minute} WIB`;
};

export const formatTwoDigit = (number: number) => {
    return number.toString().padStart(2, '0');
};

export const getFileName = (filePath: string, folderName: string) => {
    // const regex = new RegExp(`/${folderName}/(.+?)(\\?|$)`);
    const regex = new RegExp(`${folderName}/(.+)$`);
    const match = filePath.match(regex);
    return match ? match[1] : '';
};

export const getProyekAnswerStatusInfo = (step: number, jawaban?: ProyekJawaban) => {
    if (!jawaban || !jawaban[`status_tahap_${step}` as keyof ProyekJawaban]) {
        return { variant: 'default' as const, text: 'Sedang Mengerjakan' };
    }

    const status = jawaban[`status_tahap_${step}` as keyof ProyekJawaban] as keyof typeof statusMap;

    const statusMap = {
        diterima: { variant: 'success' as const, text: 'Jawaban Diterima' },
        ditolak: { variant: 'danger' as const, text: 'Jawaban Ditolak' },
        direvisi: { variant: 'warning' as const, text: 'Perlu Direvisi' },
    };

    return statusMap[status] || { variant: 'info' as const, text: 'Sedang Diproses' };
};

export const convertSecondsToTime = (seconds: number) => {
    if (!seconds || seconds < 0) return '0 detik';

    const jam = Math.floor(seconds / 3600);
    const menit = Math.floor((seconds % 3600) / 60);
    const detik = seconds % 60;

    return `${jam} jam ${menit} menit ${detik} detik`;
};
