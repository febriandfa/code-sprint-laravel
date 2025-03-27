export default function Embed({ label, src }: { label?: string; src: string }) {
    return (
        <div>
            {label && <label className="text-lg capitalize">{label}</label>}
            {src ? (
                <embed src={src} type="application/pdf" className="h-[30rem] w-full rounded-md" />
            ) : (
                <div className="flex h-[30rem] items-center justify-center rounded-md bg-gray-200">
                    <p className="text-gray-400">Tidak ada file yang tersedia</p>
                </div>
            )}
        </div>
    );
}
