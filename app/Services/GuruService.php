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

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'mapel_id' => 'required|exists:mapels,id'
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

            $firstName = strtolower(explode(' ', $validatedData['name'])[0]);
            $noUrut = $this->userRepository->getUserCount(RoleType::GURU, $validatedData['mapel_id']) + 1;
            $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);

            $password = $firstName . $noUrutFormatted;
            $combination = substr($password, 0, 1) . str_repeat('*', strlen($password) - 2) . substr($password, -1);

            $this->userRepository->create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'mapel_id' => $validatedData['mapel_id'],
                'password' => $password,
                'combination' => $combination,
                'role' => RoleType::GURU
            ]);

            return redirect()->back()->with('success', 'Guru berhasil ditambahkan');
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
            if ($validatedData['name'] != $existingUser->name && $validatedData['mapel_id'] != $existingUser->mapel_id) {
                $firstName = strtolower(explode(' ', $validatedData['name'])[0]);
                $noUrut = $this->userRepository->getUserCount(RoleType::GURU, $validatedData['mapel_id']) + 1;
                $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);

                $password = $firstName . $noUrutFormatted;
                $combination = substr($password, 0, 1) . str_repeat('*', strlen($password) - 2) . substr($password, -1);
            } else {
                $password = null;
                $combination = null;
            }

            $this->userRepository->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'mapel_id' => $validatedData['mapel_id'],
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
