<?php

use App\Http\Controllers\Siswa\KelompokController;
use App\Http\Controllers\Siswa\KuisController;
use App\Http\Controllers\Siswa\MateriController;
use App\Http\Controllers\Siswa\NilaiController;
use App\Http\Controllers\Siswa\ProyekController;
use App\Http\Controllers\Siswa\ProyekJawabanController;
use Illuminate\Support\Facades\Route;

Route::prefix('siswa')->name('siswa.')->middleware('role:siswa')->group(function () {
    Route::get('/kuis', [KuisController::class, 'index'])->name('kuis.index');
    Route::resources([
        'nilai' => NilaiController::class,
    ]);

    Route::middleware(['read_materi'])->group(function() {
        Route::resources([
            'materi' => MateriController::class,
        ]);
    });

    Route::middleware(['already_joined'])->group(function () {
        Route::resources([
            'proyek' => ProyekController::class,
        ]);
        Route::middleware(['next_syntax'])->group(function() {
            Route::get('/proyek/{proyekId}/syntax/1', [ProyekController::class, 'syntaxOne'])->name('proyek.syntaxOne');
            Route::get('/proyek/{proyekId}/syntax/2', [ProyekController::class, 'syntaxtwo'])->name('proyek.syntaxTwo');
            Route::get('/proyek/{proyekId}/syntax/3', [ProyekController::class, 'syntaxThree'])->name('proyek.syntaxThree');
            Route::get('/proyek/{proyekId}/syntax/4', [ProyekController::class, 'syntaxFour'])->name('proyek.syntaxFour');
            Route::get('/proyek/{proyekId}/syntax/5', [ProyekController::class, 'syntaxFive'])->name('proyek.syntaxFive');
            Route::get('/proyek/{proyekId}/syntax/6', [ProyekController::class, 'syntaxSix'])->name('proyek.syntaxSix');
        });
        Route::post('/proyek/{proyekId}/jawab', [ProyekJawabanController::class, 'store'])->name('proyek.storeAnswer');
        Route::patch('/proyek/{proyekId}/jawab/{id}/update', [ProyekJawabanController::class, 'update'])->name('proyek.updateAnswer');
        Route::post('/proyek/{proyekId}/jadwal', [ProyekJawabanController::class, 'storeJadwal'])->name('proyek.storeJadwal');
        Route::patch('/proyek/{proyekId}/jadwal/{id}/update', [ProyekJawabanController::class, 'updateJadwal'])->name('proyek.updateJadwal');
        Route::delete('/proyek/{proyekId}/jadwal/{id}/delete', [ProyekJawabanController::class, 'deleteJadwal'])->name('proyek.deleteJadwal');
    });

    Route::middleware(['kuis_answered'])->group(function () {
        Route::get('/kuis/{kuis}/show', [KuisController::class, 'show'])->name('kuis.show');
        Route::post('/kuis/answer', [KuisController::class, 'answer'])->name('kuis.answer');
        Route::get('/kuis/{kuis}/hasil', [KuisController::class, 'hasil'])->name('kuis.hasil');
    });

    Route::post('/kelompok/{kelompokId}/join', [KelompokController::class, 'join'])->name('kelompok.join');
    Route::get('/proyek/{proyekId}/kelompok', [ProyekController::class, 'kelompok'])->name('proyek.kelompok');
});
