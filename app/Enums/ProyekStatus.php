<?php

namespace App\Enums;

enum ProyekStatus
{
    const BELUM = 'belum';
    const PROSES = 'proses';
    const SELESAI = 'selesai';

    public static function values(): array
    {
        return array_values((new \ReflectionClass(self::class))->getConstants());
    }
}
