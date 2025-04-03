<?php

use App\Http\Controllers\Admin\GuruController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\SiswaController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
    Route::resources([
        'kelas' => KelasController::class,
        'mapel' => MapelController::class,
        'siswa' => SiswaController::class,
        'guru' => GuruController::class,
    ]);

    Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
});
