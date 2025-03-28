<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kelompoks', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('jumlah_anggota');
            $table->longText('masalah');
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('kelompok_anggotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelompok_id')->constrained('kelompoks')->onDelete('cascade');
            $table->foreignId('anggota_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['ketua', 'anggota']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelompoks');
        Schema::dropIfExists('kelompok_anggotas');
    }
};
