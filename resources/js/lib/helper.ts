export const stripHtml = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
};
