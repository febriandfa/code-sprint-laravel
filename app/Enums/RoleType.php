<?php

namespace App\Enums;

enum RoleType
{
    const SISWA = 'siswa';
    const GURU = 'guru';
    const ADMIN = 'admin';

    public static function values(): array
    {
        return array_values((new \ReflectionClass(self::class))->getConstants());
    }
}
