import Button from './button';

export default function Embed({ label, src, downloadable }: { label?: string; src?: string; downloadable?: boolean }) {
    const handleDownload = () => {
        const fileUrl = src || '';
        const fileName = fileUrl.split('/').pop();

        if (!fileName) {
            console.error('Nama file tidak dapat ditemukan.');
            return;
        }

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            {label && <label className="text-lg capitalize">{label}</label>}
            {src ? (
                src.endsWith('.pdf') ? (
                    <embed src={src} type="application/pdf" className="h-[30rem] w-full rounded-md" />
                ) : (
                    <div className="flex h-[30rem] flex-col items-center justify-center rounded-md bg-gray-200">
                        <p className="mb-2 text-gray-400">File tidak dapat ditampilkan</p>
                        {downloadable && <Button onClick={handleDownload}>Unduh File</Button>}
                    </div>
                )
            ) : (
                <div className="flex h-[30rem] items-center justify-center rounded-md bg-gray-200">
                    <p className="text-gray-400">Tidak ada file yang tersedia</p>
                </div>
            )}
        </div>
    );
}
