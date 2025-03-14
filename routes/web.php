<?php

use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('guru/dashboard-guru');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::resources([
            'kelas' => KelasController::class,
            'mapel' => MapelController::class,
        ]);

        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard-admin');
        })->name('dashboard');
    });

    Route::prefix('guru')->name('guru.')->middleware('role:guru')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('guru/dashboard-guru');
        })->name('dashboard');
    });

    Route::prefix('siswa')->name('siswa.')->middleware('role:siswa')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('siswa/dashboard-siswa');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
