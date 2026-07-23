export default function RichTextView({ label, value }: { label?: string; value?: string }) {
    return (
        <div>
            {label && <label className="text-lg capitalize">{label}</label>}
            <div className="min-h-40 w-full overflow-y-auto rounded-md border border-gray-200 bg-white px-4 py-2">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">Tidak ada deskripsi</p>' }} />
            </div>
        </div>
    );
}
