<?php

namespace App\Enums;

enum ProyekAnswerStatus
{
    const TERIMA = 'diterima';
    const TOLAK = 'ditolak';
    const REVISI = 'direvisi';
    const PROSES = 'diproses';

    public static function values(): array
    {
        return array_values((new \ReflectionClass(self::class))->getConstants());
    }
}
