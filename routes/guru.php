<?php

use App\Http\Controllers\Guru\KelompokController;
use App\Http\Controllers\Guru\KuisController;
use App\Http\Controllers\Guru\KuisSoalController;
use App\Http\Controllers\Guru\MateriController;
use App\Http\Controllers\Guru\NilaiController;
use App\Http\Controllers\Guru\ProyekController;
use App\Http\Controllers\Guru\ProyekJawabanController;
use App\Http\Controllers\Guru\ProyekNilaiController;
use Illuminate\Support\Facades\Route;

Route::prefix('guru')->name('guru.')->middleware('role:guru')->group(function () {
    Route::resources([
        'materi' => MateriController::class,
        'kuis' => KuisController::class,
        'proyek' => ProyekController::class,
        'nilai' => NilaiController::class,
    ]);
    Route::get('/kuis/{kuisId}/soal/create', [KuisSoalController::class, 'create'])->name('kuis.soalCreate');
    Route::post('/kuis/{kuisId}/soal', [KuisSoalController::class, 'store'])->name('kuis.soalStore');
    Route::patch('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'update'])->name('kuis.soalUpdate');
    Route::delete('/kuis/{kuisId}/soal/{soalId}', [KuisSoalController::class, 'destroy'])->name('kuis.soalDestroy');
    Route::get('/kuis/{kuisId}/siswa', [KuisController::class, 'siswa'])->name('kuis.siswa');
    Route::get('/kuis/{kuisId}/siswa/{siswaId}', [KuisController::class, 'hasil'])->name('kuis.hasil');

    Route::patch('/proyek/{proyekId}/start', [ProyekController::class, 'start'])->name('proyek.start');
    Route::patch('/proyek/{proyekId}/end', [ProyekController::class, 'end'])->name('proyek.end');

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
    Route::get('/proyek/{proyekId}/nilai', [ProyekNilaiController::class, 'create'])->name('proyek.nilaiCreate');
    Route::post('/proyek/{proyekId}/nilai', [ProyekNilaiController::class, 'store'])->name('proyek.nilaiStore');
    Route::get('/proyek/{proyekId}/nilai/{id}/edit', [ProyekNilaiController::class, 'edit'])->name('proyek.nilaiEdit');
    Route::patch('/proyek/{proyekId}/nilai/{id}', [ProyekNilaiController::class, 'update'])->name('proyek.nilaiUpdate');

    Route::get('/nilai/{kelasId}/kelas', [NilaiController::class, 'siswa'])->name('nilai.siswa');
});
