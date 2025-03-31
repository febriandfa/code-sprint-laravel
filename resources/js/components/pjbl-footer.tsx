import { LoaderCircle } from 'lucide-react';
import Button from './ui/button';

export default function PjblFooter({
    role = 'anggota',
    disabled,
    onSubmit,
    guru = false,
}: {
    role?: string;
    disabled: boolean;
    onSubmit: () => void;
    guru?: boolean;
}) {
    return (
        <div className="flex justify-end">
            {(role === 'ketua' || guru) && (
                <div className="flex gap-2">
                    <Button onClick={onSubmit} disabled={disabled}>
                        {disabled && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {guru ? 'Simpan' : 'Kirim'}
                    </Button>
                </div>
            )}
        </div>
    );
}
