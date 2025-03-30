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
