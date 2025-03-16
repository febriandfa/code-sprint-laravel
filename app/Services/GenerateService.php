<?php

namespace App\Services;

use App\Repositories\UserRepository;

class GenerateService
{
    public function __construct()
    {
        //
    }

    public function generatePasswordCombination(string $fullName)
    {
        $names = explode(' ', strtolower($fullName));
        $firstName = $names[0] ?? '';
        $secondName = $names[1] ?? '';

        $randNumber = rand(000, 999);

        $password = (strlen($firstName . $randNumber) >= 8)
            ? $firstName . $randNumber
            : $firstName . $secondName . $randNumber;

        return $password;
    }

    public function hidePasswordCombination(string $password)
    {
        return substr($password, 0, 1) . str_repeat('*', max(0, strlen($password) - 4)) . substr($password, -3);
    }
}
