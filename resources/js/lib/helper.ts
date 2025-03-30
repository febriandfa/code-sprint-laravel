import { ProyekJawaban } from '@/types';

export const stripHtml = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
};

export const formatTwoDigit = (number: number) => {
    return number.toString().padStart(2, '0');
};

export const getFileName = (filePath: string, folderName: string) => {
    const regex = new RegExp(`/${folderName}/(.+?)(\\?|$)`);
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
