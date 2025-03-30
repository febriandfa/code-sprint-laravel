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
        Schema::create('proyek_nilais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->foreignId('kelompok_id')->constrained('kelompoks')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('nilai_orientasi_masalah', [1, 2, 3, 4, 5]);
            $table->enum('nilai_kerja_sama', [1, 2, 3, 4, 5]);
            $table->enum('nilai_proses', [1, 2, 3, 4, 5]);
            $table->enum('nilai_waktu', [1, 2, 3, 4, 5]);
            $table->enum('nilai_hasil_proyek', [1, 2, 3, 4, 5]);
            $table->integer('nilai');
            $table->text('evaluasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek_nilais');
    }
};
