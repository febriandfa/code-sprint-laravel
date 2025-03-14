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
        Schema::create('proyek_jawabans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->foreignId('kelompok_id')->constrained('kelompoks')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->longText('jawaban_tahap_1')->nullable();
            $table->text('feedback_tahap_1')->nullable();
            $table->enum('status_tahap_1', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_2')->nullable();
            $table->text('feedback_tahap_2')->nullable();
            $table->enum('status_tahap_2', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_3')->nullable();
            $table->text('feedback_tahap_3')->nullable();
            $table->enum('status_tahap_3', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_4')->nullable();
            $table->text('feedback_tahap_4')->nullable();
            $table->enum('status_tahap_4', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_5')->nullable(); //sintaks 2
            $table->text('feedback_tahap_5')->nullable();
            $table->enum('status_tahap_5', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_6')->nullable(); //sintaks 3
            $table->text('feedback_tahap_6')->nullable();
            $table->enum('status_tahap_6', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_7')->nullable(); //sintaks 4
            $table->text('feedback_tahap_7')->nullable();
            $table->enum('status_tahap_7', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->longText('jawaban_tahap_8')->nullable(); //sintaks 5
            $table->string('file_proyek')->nullable();
            $table->string('file_laporan')->nullable();
            $table->text('feedback_tahap_8')->nullable();
            $table->enum('status_tahap_8', ['diterima', 'ditolak', 'direvisi'])->nullable();
            $table->timestamps();
        });

        Schema::create('proyek_jadwals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->foreignId('kelompok_id')->constrained('kelompoks')->onDelete('cascade');
            $table->foreignId('anggota_id')->constrained('users')->onDelete('cascade');
            $table->string('nama');
            $table->dateTime('tenggat_waktu');
            $table->enum('status', ['belum', 'proses', 'sudah'])->default('belum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek_jawabans');
        Schema::dropIfExists('proyek_jadwals');
    }
};
