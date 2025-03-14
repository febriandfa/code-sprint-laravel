<?php

namespace App\Enums;

enum SemesterEnum
{
    const GANJIL = 'ganjil';
    const GENAP = 'genap';

    public static function values(): array
    {
        return array_values((new \ReflectionClass(self::class))->getConstants());
    }
}
