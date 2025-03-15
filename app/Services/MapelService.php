<?php

namespace App\Services;

use App\Enums\SemesterEnum;
use App\Repositories\MapelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MapelService
{
    /**
     * Create a new class instance.
     */

    protected $mapelRepository;

    public function __construct(MapelRepository $mapelRepository)
    {
        $this->mapelRepository = $mapelRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'semester' => 'required|in:' . implode(',', SemesterEnum::values()),
            'tahun_ajaran' => ['required', 'regex:/^\d{4}\/\d{4}$/'],
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

            $this->mapelRepository->create($validatedData);

            return redirect()->back()->with('success', 'Mata pelajaran berhasil ditambahkan');
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

            $this->mapelRepository->update($validatedData, $id);

            return to_route('admin.mapel.index')->with('success', 'Mata pelajaran berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->mapelRepository->delete($id);

            return redirect()->back()->with('success', 'Mata pelajaran berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
