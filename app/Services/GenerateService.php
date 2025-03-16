<?php

namespace App\Services;

use App\Repositories\UserRepository;

class GenerateService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function generatePasswordCombination(string $fullName, string $role, string $kelasId)
    {
        $names = explode(' ', strtolower($fullName));
        $firstName = $names[0] ?? '';
        $secondName = $names[1] ?? '';

        $noUrut = $this->userRepository->getUserCount($role, $kelasId) + 1;
        $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);

        $password = (strlen($firstName . $noUrutFormatted) >= 8)
            ? $firstName . $noUrutFormatted
            : $firstName . $secondName . $noUrutFormatted;

        return $password;
    }

    public function hidePasswordCombination(string $password)
    {
        return substr($password, 0, 1) . str_repeat('*', max(0, strlen($password) - 4)) . substr($password, -3);
    }
}
