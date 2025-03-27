<?php

use App\Http\Controllers\Admin\GuruController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\SiswaController;
use App\Http\Controllers\Guru\KelompokController;
use App\Http\Controllers\Guru\KuisController;
use App\Http\Controllers\Guru\KuisSoalController;
use App\Http\Controllers\Guru\MateriController;
use App\Http\Controllers\Guru\ProyekController;
use App\Http\Controllers\Siswa\KuisController as SiswaKuisController;
use App\Http\Controllers\Siswa\MateriController as SiswaMateriController;
use App\Http\Controllers\Siswa\ProyekController as SiswaProyekController;
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
            'siswa' => SiswaController::class,
            'guru' => GuruController::class,
        ]);

        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard-admin');
        })->name('dashboard');
    });

    Route::prefix('guru')->name('guru.')->middleware('role:guru')->group(function () {
        Route::resources([
            'materi' => MateriController::class,
            'kuis' => KuisController::class,
            'proyek' => ProyekController::class,
            'kelompok' => KelompokController::class,
        ]);
        Route::get('/kuis/{kuisId}/soal/create', [KuisSoalController::class, 'create'])->name('kuis.soalCreate');
        Route::post('/kuis/{kuisId}/soal', [KuisSoalController::class, 'store'])->name('kuis.soalStore');
        Route::patch('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'update'])->name('kuis.soalUpdate');
        Route::delete('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'destroy'])->name('kuis.soalDestroy');

        Route::get('dashboard', function () {
            return Inertia::render('guru/dashboard-guru');
        })->name('dashboard');
    });

    Route::prefix('siswa')->name('siswa.')->middleware('role:siswa')->group(function () {
        Route::resources([
            'materi' => SiswaMateriController::class,
            'kuis' => SiswaKuisController::class,
            'proyek' => SiswaProyekController::class,
        ]);

        Route::get('dashboard', function () {
            return Inertia::render('siswa/dashboard-siswa');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
