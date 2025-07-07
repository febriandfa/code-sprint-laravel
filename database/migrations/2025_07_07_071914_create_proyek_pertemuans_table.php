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
        Schema::create('proyek_pertemuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->string('nama_pertemuan_1');
            $table->dateTime('tanggal_mulai_1');
            $table->dateTime('tanggal_selesai_1');
            $table->string('nama_pertemuan_2');
            $table->dateTime('tanggal_mulai_2');
            $table->dateTime('tanggal_selesai_2');
            $table->string('nama_pertemuan_3');
            $table->dateTime('tanggal_mulai_3');
            $table->dateTime('tanggal_selesai_3');
            $table->string('nama_pertemuan_4');
            $table->dateTime('tanggal_mulai_4');
            $table->dateTime('tanggal_selesai_4');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek_pertemuans');
    }
};
