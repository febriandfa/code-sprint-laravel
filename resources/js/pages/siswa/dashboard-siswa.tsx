import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';

export default function DashboardSiswa() {
    return (
        <AuthLayout title="Dashboard" siswa>
            <div className="grid grid-cols-2 gap-4">
                <Container className="col-span-1">
                    <Subtitle subtitle="Data Diri" />
                </Container>
                <Container className="col-span-1">
                    <Subtitle subtitle="Tugas Terbaru" />
                </Container>
                <Container className="col-span-2">
                    <Subtitle subtitle="Grafik Pembelajaran" />
                </Container>
                <Container className="col-span-2">
                    <Subtitle subtitle="Pembelajaran Terbaru" />
                </Container>
            </div>
        </AuthLayout>
    );
}
