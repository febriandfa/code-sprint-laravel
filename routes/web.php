<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin Routes
    require __DIR__.'/admin.php';

    // Guru Routes
    require __DIR__.'/guru.php';

    // Siswa Routes
    require __DIR__.'/siswa.php';
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
