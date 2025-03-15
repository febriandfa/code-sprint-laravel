<?php

namespace App\Services;

use App\Repositories\MateriRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MateriService
{
    /**
     * Create a new class instance.
     */

    protected $materiRepository;

    public function __construct(MateriRepository $materiRepository)
    {
        $this->materiRepository = $materiRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'file_materi' => 'required|file|mimes:pdf|max:2048',
            'file_modul' => 'required|file|mimes:pdf|max:2048',
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

            $materiPath = null;
            if ($request->hasFile('file_materi')) {
                $fileMateri = $request->file('file_materi');
                $extension = $fileMateri->getClientOriginalName();
                $materiName = date('YmdHis') . "." . $extension;
                $fileMateri->move(storage_path('app/public/materi'), $materiName);
                $materiPath = '/storage/materi/' . $materiName;
            };

            $modulPath = null;
            if ($request->hasFile('file_modul')) {
                $fileModul = $request->file('file_modul');
                $extension = $fileModul->getClientOriginalName();
                $modulName = date('YmdHis') . "." . $extension;
                $fileModul->move(storage_path('app/public/modul'), $modulName);
                $modulPath = '/storage/modul/' . $modulName;
            };

            $this->materiRepository->create([
                'judul' => $validatedData['judul'],
                'deskripsi' => $validatedData['deskripsi'],
                'file_materi' => $materiPath,
                'file_modul' => $modulPath,
            ]);

            return redirect()->back()->with('success', 'Materi berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
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

            $materi = $this->materiRepository->getById($id);

            if ($request->hasFile('file_materi')) {
                $fileMateri = $request->file('file_materi');
                $extension = $fileMateri->getClientOriginalName();
                $materiName = date('YmdHis') . "." . $extension;
                $fileMateri->move(storage_path('app/public/materi'), $materiName);
                $materiPath = '/storage/materi/' . $materiName;
            } else {
                $materiPath = $materi->file_materi;
            };

            if ($request->hasFile('file_modul')) {
                $fileModul = $request->file('file_modul');
                $extension = $fileModul->getClientOriginalName();
                $modulName = date('YmdHis') . "." . $extension;
                $fileModul->move(storage_path('app/public/modul'), $modulName);
                $modulPath = '/storage/modul/' . $modulName;
            } else {
                $modulPath = $materi->file_modul;
            };

            $this->materiRepository->update([
                'judul' => $validatedData['judul'],
                'deskripsi' => $validatedData['deskripsi'],
                'file_materi' => $materiPath,
                'file_modul' => $modulPath,
            ], $id);

            return redirect()->back()->with('success', 'Materi berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->materiRepository->delete($id);

            return redirect()->back()->with('success', 'Materi berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
