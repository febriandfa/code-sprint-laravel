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
        Schema::create('kuises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('materi_id')->constrained('materis')->onDelete('cascade');
            $table->string('judul');
            $table->integer('durasi');
            $table->dateTime('tanggal_mulai');
            $table->dateTime('tanggal_selesai');
            $table->timestamps();
        });

        Schema::create('kuis_soals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kuis_id')->constrained('kuises')->onDelete('cascade');
            $table->string('soal');
            $table->string('gambar_soal')->nullable();
            $table->integer('poin');
            $table->timestamps();
        });

        Schema::create('kuis_opsis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kuis_soal_id')->constrained('kuis_soals')->onDelete('cascade');
            $table->string('opsi');
            $table->tinyInteger('is_answer')->default(0);
            $table->timestamps();
        });

        Schema::create('kuis_jawabans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kuis_id')->constrained('kuises')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('total_poin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kuises');
        Schema::dropIfExists('kuis_soals');
        Schema::dropIfExists('kuis_opsis');
        Schema::dropIfExists('kuis_jawabans');
    }
};
