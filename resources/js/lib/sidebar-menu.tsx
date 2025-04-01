import Category from '@/components/icons/category-icon';
import { UserRole } from '@/types';

export const sidebarMenus = (userRole: UserRole) => {
    const menus = {
        admin: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('admin.dashboard'),
            },
            {
                name: 'Guru',
                icon: <Category />,
                link: route('admin.guru.index'),
            },
            {
                name: 'Siswa',
                icon: <Category />,
                link: route('admin.siswa.index'),
            },
            {
                name: 'Mata Pelajaran',
                icon: <Category />,
                link: route('admin.mapel.index'),
            },
            {
                name: 'Kelas',
                icon: <Category />,
                link: route('admin.kelas.index'),
            },
        ],
        guru: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('guru.dashboard'),
            },
            {
                name: 'Materi',
                icon: <Category />,
                link: route('guru.materi.index'),
            },
            {
                name: 'Kuis',
                icon: <Category />,
                link: route('guru.kuis.index'),
            },
            {
                name: 'Project Based Learning',
                icon: <Category />,
                link: route('guru.proyek.index'),
            },
            {
                name: 'Nilai',
                icon: <Category />,
                link: route('guru.nilai.index'),
            },
        ],
        siswa: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('siswa.dashboard'),
            },
            {
                name: 'Materi',
                icon: <Category />,
                link: route('siswa.materi.index'),
            },
            {
                name: 'Kuis',
                icon: <Category />,
                link: route('siswa.kuis.index'),
            },
            {
                name: 'Project Based Learning',
                icon: <Category />,
                link: route('siswa.proyek.index'),
            },
            {
                name: 'Nilai',
                icon: <Category />,
                // link: route('siswa.nilai.index'),
            },
        ],
    };

    return menus[userRole];
};
