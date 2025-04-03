import Category from '@/components/icons/category-icon';
import { UserRole } from '@/types';

export const sidebarMenus = (userRole: UserRole) => {
    const currentRoute = route().current() || '';

    const menus = {
        admin: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('admin.dashboard'),
                active: currentRoute.startsWith('admin.dashboard'),
            },
            {
                name: 'Guru',
                icon: <Category />,
                link: route('admin.guru.index'),
                active: currentRoute.startsWith('admin.guru'),
            },
            {
                name: 'Siswa',
                icon: <Category />,
                link: route('admin.siswa.index'),
                active: currentRoute.startsWith('admin.siswa'),
            },
            {
                name: 'Mata Pelajaran',
                icon: <Category />,
                link: route('admin.mapel.index'),
                active: currentRoute.startsWith('admin.mapel'),
            },
            {
                name: 'Kelas',
                icon: <Category />,
                link: route('admin.kelas.index'),
                active: currentRoute.startsWith('admin.kelas'),
            },
        ],
        guru: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('guru.dashboard'),
                active: currentRoute.startsWith('guru.dashboard'),
            },
            {
                name: 'Materi',
                icon: <Category />,
                link: route('guru.materi.index'),
                active: currentRoute.startsWith('guru.materi'),
            },
            {
                name: 'Kuis',
                icon: <Category />,
                link: route('guru.kuis.index'),
                active: currentRoute.startsWith('guru.kuis'),
            },
            {
                name: 'Project Based Learning',
                icon: <Category />,
                link: route('guru.proyek.index'),
                active: currentRoute.startsWith('guru.proyek'),
            },
            {
                name: 'Nilai',
                icon: <Category />,
                link: route('guru.nilai.index'),
                active: currentRoute.startsWith('guru.nilai'),
            },
        ],
        siswa: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('siswa.dashboard'),
                active: currentRoute.startsWith('siswa.dashboard'),
            },
            {
                name: 'Materi',
                icon: <Category />,
                link: route('siswa.materi.index'),
                active: currentRoute.startsWith('siswa.materi'),
            },
            {
                name: 'Kuis',
                icon: <Category />,
                link: route('siswa.kuis.index'),
                active: currentRoute.startsWith('siswa.kuis'),
            },
            {
                name: 'Project Based Learning',
                icon: <Category />,
                link: route('siswa.proyek.index'),
                active: currentRoute.startsWith('siswa.proyek'),
            },
            {
                name: 'Nilai',
                icon: <Category />,
                link: route('siswa.nilai.index'),
                active: currentRoute.startsWith('siswa.nilai'),
            },
        ],
    };

    return menus[userRole];
};
