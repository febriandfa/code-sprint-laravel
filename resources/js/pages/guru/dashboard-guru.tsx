import Container from '@/components/ui/container';
import Subtitle from '@/components/ui/subtitle';
import AuthLayout from '@/layouts/auth-layout';

export default function DashboardGuru() {
    return (
        <AuthLayout title="Dashboard" siswa>
            <div className="grid grid-cols-3 gap-4">
                <Container className="col-span-3">
                    <Subtitle subtitle="Data Guru" />
                </Container>
                <Container className="col-span-3">
                    <Subtitle subtitle="Grafik Pembelajaran" />
                </Container>
                <Container className="col-span-1">
                    <Subtitle subtitle="Materi Terbaru" />
                </Container>
                <Container className="col-span-1">
                    <Subtitle subtitle="Kuis Terbaru" />
                </Container>
                <Container className="col-span-1">
                    <Subtitle subtitle="Proyek Terbaru" />
                </Container>
            </div>
        </AuthLayout>
    );
}
