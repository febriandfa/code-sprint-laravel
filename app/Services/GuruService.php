<?php

namespace App\Services;

use App\Enums\RoleType;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuruService
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

    public function validateInput(array $data, string $id = null)
    {
        return Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'mapel_id' => 'required|array',
            'mapel_id.*' => 'required|exists:mapels,id',
            'kelas_id' => 'required|array',
            'kelas_id.*' => 'required|exists:kelases,id',
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

            $password = $this->generateService->generatePasswordCombination(
                $validatedData['name'],
                RoleType::GURU,
                $validatedData['kelas_id']
            );
            $combination = $this->generateService->hidePasswordCombination($password);

            $this->userRepository->create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'mapel_id' => $validatedData['mapel_id'],
                'kelas_id' => $validatedData['kelas_id'],
                'password' => $password,
                'combination' => $combination,
                'role' => RoleType::GURU,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect()->back()->with('success', 'Guru berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $validator = $this->validateInput($request->all(), $id);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $existingUser = $this->userRepository->getById($id);
            if ($validatedData['name'] != $existingUser->name || $validatedData['kelas_id'] != $existingUser->kelas_id) {
                $password = $this->generateService->generatePasswordCombination(
                    $validatedData['name'],
                    RoleType::GURU,
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
                'mapel_id' => $validatedData['mapel_id'],
                'kelas_id' => $validatedData['kelas_id'],
                'password' => $password,
                'combination' => $combination,
                'role' => RoleType::GURU
            ], $id);

            return to_route('admin.guru.index')->with('success', 'Guru berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->userRepository->delete($id);

            return redirect()->back()->with('success', 'Guru berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
