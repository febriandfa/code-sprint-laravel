import Category from '@/components/icons/Category';
import { UserRole } from '@/types';

export const sidebarMenus = (userRole: UserRole) => {
    const menus = {
        admin: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: '/admin/dashboard',
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
