import Category from '@/components/icons/category-icon';
import { UserRole } from '@/types';

export const sidebarMenus = (userRole: UserRole) => {
    const menus = {
        admin: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: '/admin/dashboard',
            },
            {
                name: 'Guru',
                icon: <Category />,
                link: '/admin/guru',
            },
            {
                name: 'Siswa',
                icon: <Category />,
                link: '/admin/siswa',
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
                link: '/guru/dashboard',
            },
        ],
        siswa: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: '/siswa/dashboard',
            },
        ],
    };

    return menus[userRole];
};
