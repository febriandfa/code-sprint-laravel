import AppLogo from '@/components/app-logo';
import Arrow from '@/components/icons/arrow';
import Collabs from '@/components/icons/collabs';
import Creative from '@/components/icons/creative';
import Globe from '@/components/icons/creative copy';
import IconMateri from '@/components/icons/icon-materi';
import Kuis from '@/components/icons/kuis';
import Nilai from '@/components/icons/nilai';
import Proyek from '@/components/icons/proyek';
import Navbar from '@/components/navbar-landing';
import Button from '@/components/ui/button';
import Checklist from '@/components/ui/checklist';

import { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function Landing() {
    const { auth } = usePage().props as { auth?: Auth };
    // const [hasScrolled, setHasScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);
    const menuItems = [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Fitur', href: '#fitur' },
        { label: 'Tentang PJBL', href: '#tentang' },
    ];

    const [isAuth, setIsAuth] = useState(false);
    const items = [
        'Materi dibuat dengan terstruktur memudahkan pembelajaran',
        'Belajar Pemrograman langsung melalui proyek nyata untuk meningkatkan keterampilan',
        'Bekerja sama dalam tim, diskusikan solusi, dan tingkatkan pemahaman melalui interaksi',
        'Belajar kapan saja dan di mana saja dengan platform berbasis web yang fleksibel',
    ];

    useEffect(() => {
        setIsAuth(!!auth?.user);
    }, [auth]);
    
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <React.Fragment>
            <Head title={'Beranda'} />
            <div className="min-h-screen bg-white">
                {/* Navbar */}
                <Navbar />

                {/* Hero Section */}
                <section id="beranda" className="Hero grid items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-32">
                    {/* Gambar di atas saat mobile */}
                    <div className="order-1 place-self-center md:order-2">
                        <img src="/assets/images/hero-3.png" alt="illust login" className="w-[50dvh] sm:w-[50dvh] md:w-dvh" />
                    </div>

                    {/* Teks rata kiri di semua ukuran */}
                    <div className="order-2 text-left md:order-1">
                        <div className="mb-6">
                            <h1 className="font-base mb-2 text-xl sm:text-2xl md:text-4xl">
                                Tingkatkan Kompetensi <span className="font-semibold">Pemrograman</span> dengan <br />
                                Pembelajaran Berbasis <span className="font-semibold">Proyek</span>
                            </h1>
                            <p className="text-sm text-slate-400 sm:text-base">
                                Code Sprint menghadirkan pengalaman belajar interaktif dengan pendekatan{' '}
                                <span className="italic">Project-Based Learning</span> (PjBL).
                            </p>
                        </div>
                        <Link className="mt-4 inline-block" href={route(isAuth ? 'dashboard' : 'login')}>
                            <Button className="text-sm sm:text-base">Belajar Sekarang</Button>
                        </Link>
                    </div>
                </section>

                {/* Menu Section */}
                <section id="fitur" className="Fitur items-center gap-12 bg-blue-100 px-6 py-32 md:grid-cols-2 md:px-32">
                    <div className="text mx-auto mb-8 text-center">
                        <h1 className="mb-2 text-xl font-medium sm:text-2xl md:text-3xl">
                            Jelajahi Pembelajaran Terstruktur <br className="hidden md:block" /> dengan CodeSprint
                        </h1>

                        <p className="text-sm text-slate-400 sm:text-base">
                            CodeSprint menyediakan fitur utama untuk
                            <br className="hidden md:block" />
                            pembelajaran yang lebih sistematis dan efektif.
                        </p>
                    </div>

                    <section className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-6 shadow-sm">
                            <IconMateri />
                            <span className="text-lg font-medium">Materi</span>
                        </div>

                        <div className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-6 shadow-sm">
                            <Kuis />
                            <span className="text-lg font-medium">Kuis</span>
                        </div>
                        <div className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-6 shadow-sm">
                            <Proyek />
                            <span className="text-lg font-medium">Project</span>
                        </div>
                        <div className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-4 shadow-sm">
                            <Nilai />
                            <span className="text-lg font-medium">Nilai</span>
                        </div>
                    </section>
                </section>

                {/* lIST */}
                <section className="Hero grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-32">
                    {/* Gambar di atas saat mobile */}
                    <div className="order-1 place-self-center md:order-1">
                        <div className="order-1 place-self-center md:sticky md:top-20 md:order-1">
                            <img src="/assets/images/hero-2.png" alt="illust login" className="w-dvh" />
                        </div>
                    </div>

                    {/* Teks rata kiri di semua ukuran */}
                    <div className="order-2 text-left md:order-2">
                        <div className="mb-6">
                            <h1 className="mb-6 text-xl font-light sm:text-2xl md:text-3xl">
                                Mengapa <span className="font-medium">belajar</span> dengan
                                <span className="font-medium italic"> CodeSprint?</span>
                            </h1>

                            <Checklist items={items} />
                        </div>
                    </div>
                </section>

                {/* Accordion */}
                <section id="tentang" className="px-6 py-32 md:px-32">
                    <div className="text mb-12 text-center">
                        <h1 className="text-xl font-light sm:text-2xl md:text-3xl">
                            Belajar Melalui <span className="font-medium">Pengalaman Nyata</span> <br className="hidden md:block" /> dengan
                            <span className="font-medium italic"> Project-Based Learning</span>
                        </h1>
                        <p className="text-sm text-slate-400 sm:text-base">
                            CodeSprint menyediakan fitur utama untuk pembelajaran
                            <br className="hidden md:block" />
                            yang lebih sistematis dan efektif.
                        </p>
                    </div>

                    {/* Flex Container */}
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        {/* Gambar di Atas pada Mobile, di Kanan pada Desktop */}
                        <div className="order-1 flex w-full justify-center place-self-center md:order-2 md:w-1/2 md:justify-end">
                            <img src="/assets/images/img-hero.svg" alt="illust login" className="w-dhv sm:w-[50dvh] md:w-96" />
                        </div>

                        {/* Accordion di Bawah pada Mobile, di Kiri pada Desktop */}
                        <div className="order-2 w-full max-w-xl space-y-4 place-self-center md:order-1 md:w-1/2">
                            <h1 className="text-lg font-medium sm:text-2xl md:text-xl">
                                Mengapa <span className="italic">Project Based Learning?</span>
                            </h1>
                            <details className="group rounded-xl border p-4">
                                <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                                    <div className="flex items-center gap-2 text-base">
                                        <Proyek />
                                        <span>Pembelajaran Berbasis Masalah</span>
                                    </div>
                                    <Arrow />
                                </summary>
                                <div className="mt-2 translate-y-[-8px] text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-open:translate-y-0 group-open:opacity-100">
                                    Siswa belajar dengan memecahkan masalah nyata, sehingga mereka lebih memahami konsep dan relevansinya dalam
                                    kehidupan sehari-hari.
                                </div>
                            </details>

                            <details className="group rounded-xl border p-4">
                                <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                                    <div className="flex items-center gap-2 text-base">
                                        <Collabs />
                                        <span>Kolaborasi dan Keterampilan Komunikasi</span>
                                    </div>
                                    <Arrow />
                                </summary>
                                <div className="mt-2 translate-y-[-8px] text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-open:translate-y-0 group-open:opacity-100">
                                    PBL mendorong kerja tim, komunikasi efektif, dan pengembangan keterampilan interpersonal yang penting untuk dunia
                                    kerja.
                                </div>
                            </details>

                            <details className="group rounded-xl border p-4">
                                <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                                    <div className="flex items-center gap-2 text-base">
                                        <Creative />
                                        <span> Kreativitas dan Inovasi</span>
                                    </div>
                                    <Arrow />
                                </summary>
                                <div className="mt-2 translate-y-[-8px] text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-open:translate-y-0 group-open:opacity-100">
                                    Siswa diberikan kebebasan untuk mengeksplorasi solusi kreatif, memecahkan masalah secara mandiri, dan berpikir
                                    inovatif.
                                </div>
                            </details>

                            <details className="group rounded-xl border p-4">
                                <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                                    <div className="flex items-center gap-2 text-base">
                                        <Globe />
                                        <span>Persiapan Dunia Kerja</span>
                                    </div>
                                    <Arrow />
                                </summary>
                                <div className="mt-2 translate-y-[-8px] text-gray-600 opacity-0 transition-all duration-500 ease-in-out group-open:translate-y-0 group-open:opacity-100">
                                    Dengan simulasi proyek nyata, siswa lebih siap menghadapi tantangan profesional dan memiliki pengalaman praktis
                                    sebelum terjun ke industri.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
                
                
                
                {/* Demo */}
                <section id="demo" className="px-6 py-32 md:px-32">
                    <div className="text mb-12 text-center">
                        <h1 className="text-xl font-light sm:text-2xl md:text-3xl">
                            Belajar Melalui{' '}
                            <span className="font-medium">
                                Tutorial <br />
                                Lengkap dan Praktis
                            </span>{' '}
                            untuk
                            <span className="font-medium italic"> Guru & Murid</span>
                        </h1>
                        <p className="text-sm text-slate-400 sm:text-base">
                            Belajar dan mengajar jadi makin gampang dengan panduan
                            <br className="hidden md:block" />
                            step-by-step dari CodeSprint.
                        </p>
                    </div>

                    {/* Horizontal layout: Tabs + Video */}
                    <div className="mx-auto flex flex-col gap-6 md:flex-row md:items-start md:justify-center">
                        {/* Tabs */}
                        <div className="flex justify-center pr-0 md:sticky md:top-32 md:flex-col md:items-start md:justify-start md:space-y-4 md:border-r md:border-b-0 md:pr-6">
                            {/* Tab Guru */}
                            <div className="w-56">
                                <button
                                    className={`w-full px-4 py-3 text-left transition ${
                                        activeTab === 'tab1'
                                            ? 'border-l-4 border-blue-500 bg-blue-50 font-semibold text-blue-500 md:border-r-4 md:border-l-0'
                                            : 'border-r-4 border-gray-500 bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setActiveTab('tab1')}
                                >
                                    Panduan untuk Guru
                                </button>
                                {activeTab === 'tab1' && (
                                    <p className="mt-2 px-4 py-3 text-sm text-gray-600">
                                        Panduan lengkap untuk membantu guru mengelola kelas dan konten pembelajaran.
                                    </p>
                                )}
                            </div>

                            {/* Tab Siswa */}
                            <div className="w-56">
                                <button
                                    className={`w-full px-4 py-3 text-left transition ${
                                        activeTab === 'tab2'
                                            ? 'border-l-4 border-blue-500 bg-blue-50 font-semibold text-blue-500 md:border-r-4 md:border-l-0'
                                            : 'border-r-4 border-gray-500 bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setActiveTab('tab2')}
                                >
                                    Panduan untuk Siswa
                                </button>
                                {activeTab === 'tab2' && (
                                    <p className="mt-2 px-4 py-3 text-sm text-gray-600">
                                        Petunjuk praktis bagi siswa untuk memahami fitur dan mengikuti pelajaran dengan mudah.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Video */}
                        <div className="w-full rounded-xl md:w-[600px]">
                            {activeTab === 'tab1' && (
                                <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 h-full w-full rounded-xl"
                                        src="https://www.youtube.com/embed/f-o0upDIk3Q"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            {activeTab === 'tab2' && (
                                <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 h-full w-full rounded-xl"
                                        src="https://www.youtube.com/embed/f-o0upDIk3Q"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="CTA">
                    <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-gray-50 px-6 pt-16 shadow-lg sm:rounded-xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                            <svg
                                viewBox="0 0 1024 1024"
                                aria-hidden="true"
                                className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            >
                                <circle r={512} cx={512} cy={512} fill="url(#blue-gradient)" fillOpacity="0.7" />
                                <defs>
                                    <radialGradient id="blue-gradient">
                                        <stop stopColor="#3B82F6" /> {/* Biru Muda */}
                                        <stop offset={1} stopColor="#3B82F6" /> {/* Biru Tua */}
                                    </radialGradient>
                                </defs>
                            </svg>

                            <div className="mx-auto max-w-md text-start lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                                <h1 className="mb-4 text-xl font-light sm:text-2xl md:text-3xl">
                                    Mulai Perjalanan <span className="font-medium">Belajarmu</span> <br className="hidden md:block" /> dengan
                                    <span className="font-medium italic"> CodeSpirnt!</span>
                                </h1>
                                <p className="text-start text-sm text-slate-400 sm:text-base">
                                    Jelajahi pengalaman belajar yang interaktif, aplikatif, dan <br className="hidden md:block" /> menyenangkan.
                                    Kembangkan keterampilan abad 21 dan siap hadapi tantangan dunia nyata!
                                </p>
                                <Link className="mt-4 inline-block" href={route(isAuth ? 'dashboard' : 'login')}>
                                    <Button className="text-sm sm:text-base">Belajar Sekarang</Button>
                                </Link>
                            </div>
                            <div className="relative mt-16 h-80 lg:mt-8">
                                <img
                                    alt="App screenshot"
                                    src="/assets/images/siswa-dash.svg"
                                    width={1824}
                                    height={1080}
                                    className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-8 w-full px-6 pt-6">
                    <div className="flex w-full flex-col flex-wrap items-start justify-start gap-4 md:flex-row md:items-center md:justify-between">
                        {/* <img src="" alt="brand" className="w-8" /> */}
                        <AppLogo />
                        <ul className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-x-6">
                            <li>
                                <a
                                    href="#beranda"
                                    className="cursor-pointer text-sm text-slate-800 transition-all duration-300 hover:font-medium hover:text-blue-500 hover:underline hover:underline-offset-4"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#fitur"
                                    className="cursor-pointer text-sm text-slate-800 transition-all duration-300 hover:font-medium hover:text-blue-500 hover:underline hover:underline-offset-4"
                                >
                                    Fitur
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#tentang"
                                    className="cursor-pointer text-sm text-slate-800 transition-all duration-300 hover:font-medium hover:text-blue-500 hover:underline hover:underline-offset-4"
                                >
                                    Tentang PjBL
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-4 border-slate-200" />
                    <p className="text-light text-center font-sans text-sm antialiased">© 2025 Code Sprint. All rights reserved</p>
                </footer>
            </div>
        </React.Fragment>
    );
}
