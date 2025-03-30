import { LoaderCircle } from 'lucide-react';
import Button from './ui/button';

export default function PjblFooter({ role, disabled, onSubmit }: { role: string; disabled: boolean; onSubmit: () => void }) {
    return (
        <div className="flex justify-end">
            {role === 'ketua' && (
                <div className="flex gap-2">
                    <Button variant="outline-primary">Edit</Button>
                    <Button onClick={onSubmit} disabled={disabled}>
                        {disabled && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Kirim
                    </Button>
                </div>
            )}
        </div>
    );
}
