import Book from '@/components/icons/book';
import Category from '@/components/icons/category-icon';
import Guide from '@/components/icons/guide';
import IconGuru from '@/components/icons/icon-guru';
import IconKelas from '@/components/icons/icon-kelas';
import IconKuis from '@/components/icons/icon-kuis';
import IconMapel from '@/components/icons/icon-mapel';
import IconNilai from '@/components/icons/icon-nilai';
import IconProyek from '@/components/icons/icon-proyek';
import IconSiswa from '@/components/icons/icon-siswa';
import { UserRole } from '@/types';

export const sidebarMenus = (userRole: UserRole) => {
    const currentRoute = route().current() || '';

    const menus = {
        admin: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('dashboard'),
                active: currentRoute.startsWith('dashboard'),
            },
            {
                name: 'Guru',
                icon: <IconGuru />,
                link: route('admin.guru.index'),
                active: currentRoute.startsWith('admin.guru'),
            },
            {
                name: 'Siswa',
                icon: <IconSiswa />,
                link: route('admin.siswa.index'),
                active: currentRoute.startsWith('admin.siswa'),
            },
            {
                name: 'Mata Pelajaran',
                icon: <IconMapel />,
                link: route('admin.mapel.index'),
                active: currentRoute.startsWith('admin.mapel'),
            },
            {
                name: 'Kelas',
                icon: <IconKelas />,
                link: route('admin.kelas.index'),
                active: currentRoute.startsWith('admin.kelas'),
            },
            {
                name: 'Panduan',
                icon: <Guide />,
                link: route('admin.panduan.index'),
                active: currentRoute.startsWith('admin.panduan'),
            },
        ],
        guru: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('dashboard'),
                active: currentRoute.startsWith('dashboard'),
            },
            {
                name: 'Materi',
                icon: <Book />,
                link: route('guru.materi.index'),
                active: currentRoute.startsWith('guru.materi'),
            },
            {
                name: 'Kuis',
                icon: <IconKuis />,
                link: route('guru.kuis.index'),
                active: currentRoute.startsWith('guru.kuis'),
            },
            {
                name: 'Project Based Learning',
                icon: <IconProyek />,
                link: route('guru.proyek.index'),
                active: currentRoute.startsWith('guru.proyek'),
            },
            {
                name: 'Nilai',
                icon: <IconNilai />,
                link: route('guru.nilai.index'),
                active: currentRoute.startsWith('guru.nilai'),
            },
        ],
        siswa: [
            {
                name: 'Dashboard',
                icon: <Category />,
                link: route('dashboard'),
                active: currentRoute.startsWith('dashboard'),
            },
            {
                name: 'Materi',
                icon: <Book />,
                link: route('siswa.materi.index'),
                active: currentRoute.startsWith('siswa.materi'),
            },
            {
                name: 'Kuis',
                icon: <IconKuis />,
                link: route('siswa.kuis.index'),
                active: currentRoute.startsWith('siswa.kuis'),
            },
            {
                name: 'Project Based Learning',
                icon: <IconProyek />,
                link: route('siswa.proyek.index'),
                active: currentRoute.startsWith('siswa.proyek'),
            },
            {
                name: 'Nilai',
                icon: <IconNilai />,
                link: route('siswa.nilai.index'),
                active: currentRoute.startsWith('siswa.nilai'),
            },
        ],
    };

    return menus[userRole];
};
