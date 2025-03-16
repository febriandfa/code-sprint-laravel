<?php

namespace App\Services;

use App\Enums\RoleType;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SiswaService
{
    /**
     * Create a new class instance.
     */

    protected $userRepository;
    protected $generateService;

    public function __construct(UserRepository $userRepository, GenerateService $generateService)
    {
        $this->userRepository = $userRepository;
        $this->generateService = $generateService;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'kelas_id' => 'required|exists:kelases,id'
        ]);
    }

    public function create(Request $request)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $noAbsen = $this->userRepository->getUserCount(RoleType::SISWA, $validatedData['kelas_id']) + 1;
            $password = $this->generateService->generatePasswordCombination(
                $validatedData['name'],
                RoleType::SISWA,
                $validatedData['kelas_id']
            );
            $combination = $this->generateService->hidePasswordCombination($password);

            $this->userRepository->create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'kelas_id' => $validatedData['kelas_id'],
                'no_absen' => $noAbsen,
                'password' => $password,
                'combination' => $combination,
                'role' => RoleType::SISWA
            ]);

            return redirect()->back()->with('success', 'Siswa berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $existingUser = $this->userRepository->getById($id);
            if ($validatedData['name'] != $existingUser->name && $validatedData['kelas_id'] != $existingUser->kelas_id) {
                $noAbsen = $this->userRepository->getUserCount(RoleType::SISWA, $validatedData['kelas_id']) + 1;
                $password = $this->generateService->generatePasswordCombination(
                    $validatedData['name'],
                    RoleType::SISWA,
                    $validatedData['kelas_id']
                );
                $combination = $this->generateService->hidePasswordCombination($password);
            } else {
                $password = null;
                $combination = null;
            }

            $this->userRepository->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'kelas_id' => $validatedData['kelas_id'],
                'no_absen' => $noAbsen,
                'password' => $password,
                'combination' => $combination,
                'role' => RoleType::SISWA
            ], $id);

            return to_route('admin.siswa.index')->with('success', 'Siswa berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->userRepository->delete($id);

            return redirect()->back()->with('success', 'Siswa berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
