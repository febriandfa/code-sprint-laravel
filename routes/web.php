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
use App\Http\Controllers\Guru\ProyekJawabanController;
use App\Http\Controllers\Siswa\KelompokController as SiswaKelompokController;
use App\Http\Controllers\Siswa\KuisController as SiswaKuisController;
use App\Http\Controllers\Siswa\MateriController as SiswaMateriController;
use App\Http\Controllers\Siswa\ProyekController as SiswaProyekController;
use App\Http\Controllers\Siswa\ProyekJawabanController as SiswaProyekJawabanController;
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

        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard-admin');
        })->name('dashboard');
    });

    Route::prefix('guru')->name('guru.')->middleware('role:guru')->group(function () {
        Route::resources([
            'materi' => MateriController::class,
            'kuis' => KuisController::class,
            'proyek' => ProyekController::class,
        ]);
        Route::get('/kuis/{kuisId}/soal/create', [KuisSoalController::class, 'create'])->name('kuis.soalCreate');
        Route::post('/kuis/{kuisId}/soal', [KuisSoalController::class, 'store'])->name('kuis.soalStore');
        Route::patch('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'update'])->name('kuis.soalUpdate');
        Route::delete('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'destroy'])->name('kuis.soalDestroy');
        Route::get('/kuis/{kuisId}/siswa', [KuisController::class, 'siswa'])->name('kuis.siswa');
        Route::get('/kuis/{kuisId}/siswa/{siswaId}', [KuisController::class, 'hasil'])->name('kuis.hasil');

        Route::get('/proyek/{proyekId}/kelompok/create', [KelompokController::class, 'create'])->name('proyek.kelompokCreate');
        Route::post('/proyek/{proyekId}/kelompok', [KelompokController::class, 'store'])->name('proyek.kelompokStore');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}', [KelompokController::class, 'show'])->name('proyek.kelompokShow');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/edit', [KelompokController::class, 'edit'])->name('proyek.kelompokEdit');
        Route::patch('/proyek/{proyekId}/kelompok/{kelompokId}', [KelompokController::class, 'update'])->name('proyek.kelompokUpdate');
        Route::delete('/proyek/{proyekId}/kelompok/{kelompokId}', [KelompokController::class, 'destroy'])->name('proyek.kelompokDestroy');

        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/1', [ProyekController::class, 'syntaxOne'])->name('proyek.syntaxOne');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/2', [ProyekController::class, 'syntaxTwo'])->name('proyek.syntaxTwo');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/3', [ProyekController::class, 'syntaxThree'])->name('proyek.syntaxThree');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/4', [ProyekController::class, 'syntaxFour'])->name('proyek.syntaxFour');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/5', [ProyekController::class, 'syntaxFive'])->name('proyek.syntaxFive');
        Route::get('/proyek/{proyekId}/kelompok/{kelompokId}/syntax/6', [ProyekController::class, 'syntaxSix'])->name('proyek.syntaxSix');
        Route::patch('/proyek/{proyekId}/jawab/{id}/update', [ProyekJawabanController::class, 'update'])->name('proyek.updateNilai');


        Route::get('/dashboard', function () {
            return Inertia::render('guru/dashboard-guru');
        })->name('dashboard');
    });

    Route::prefix('siswa')->name('siswa.')->middleware('role:siswa')->group(function () {
        Route::get('/kuis', [SiswaKuisController::class, 'index'])->name('kuis.index');
        Route::resources([
            'materi' => SiswaMateriController::class,
        ]);

        Route::middleware(['already_joined'])->group(function () {
            Route::resources([
                'proyek' => SiswaProyekController::class,
            ]);
            Route::get('/proyek/{proyekId}/syntax/1', [SiswaProyekController::class, 'syntaxOne'])->name('proyek.syntaxOne');
            Route::get('/proyek/{proyekId}/syntax/2', [SiswaProyekController::class, 'syntaxtwo'])->name('proyek.syntaxTwo');
            Route::get('/proyek/{proyekId}/syntax/3', [SiswaProyekController::class, 'syntaxThree'])->name('proyek.syntaxThree');
            Route::get('/proyek/{proyekId}/syntax/4', [SiswaProyekController::class, 'syntaxFour'])->name('proyek.syntaxFour');
            Route::get('/proyek/{proyekId}/syntax/5', [SiswaProyekController::class, 'syntaxFive'])->name('proyek.syntaxFive');
            Route::get('/proyek/{proyekId}/syntax/6', [SiswaProyekController::class, 'syntaxSix'])->name('proyek.syntaxSix');
            Route::post('/proyek/{proyekId}/jawab', [SiswaProyekJawabanController::class, 'store'])->name('proyek.storeAnswer');
            Route::patch('/proyek/{proyekId}/jawab/{id}/update', [SiswaProyekJawabanController::class, 'update'])->name('proyek.updateAnswer');
            Route::post('/proyek/{proyekId}/jadwal', [SiswaProyekJawabanController::class, 'storeJadwal'])->name('proyek.storeJadwal');
            Route::patch('/proyek/{proyekId}/jadwal/{id}/update', [SiswaProyekJawabanController::class, 'updateJadwal'])->name('proyek.updateJadwal');
            Route::delete('/proyek/{proyekId}/jadwal/{id}/delete', [SiswaProyekJawabanController::class, 'deleteJadwal'])->name('proyek.deleteJadwal');
        });

        Route::middleware(['kuis_answered'])->group(function () {
            Route::get('/kuis/{kuis}/show', [SiswaKuisController::class, 'show'])->name('kuis.show');
            Route::post('/kuis/answer', [SiswaKuisController::class, 'answer'])->name('kuis.answer');
        });

        Route::post('/kelompok/{kelompokId}/join', [SiswaKelompokController::class, 'join'])->name('kelompok.join');
        Route::get('/proyek/{proyekId}/kelompok', [SiswaProyekController::class, 'kelompok'])->name('proyek.kelompok');

        Route::get('/dashboard', function () {
            return Inertia::render('siswa/dashboard-siswa');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
