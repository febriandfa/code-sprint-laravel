export default function Embed({label, src}: {label?:string, src?: string}) {
    return (
        <div>
            {label &&
                <label className="text-lg capitalize">
                    {label}
                </label>
            }
            <embed src={src} type="application/pdf" className="w-full rounded-md h-[30rem]" />
        </div>
    )
}
