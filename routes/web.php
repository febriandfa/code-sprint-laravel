<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PanduanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('landing');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/panduan', [PanduanController::class, 'panduan'])->name('panduan');

    // Admin Routes
    require __DIR__.'/admin.php';

    // Guru Routes
    require __DIR__.'/guru.php';

    // Siswa Routes
    require __DIR__.'/siswa.php';
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
