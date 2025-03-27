import { cn } from "@/lib/utils";

export default function RichText({ content, className }: { content? : string, className?: string }) {
    return (
        <div
            className={cn("prose max-w-none", className)}
            dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Tidak ada konten</p>' }}
        />
    )
}
