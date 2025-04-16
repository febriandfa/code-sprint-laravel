<?php

namespace App\Services;

use App\Repositories\PanduanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PanduanService
{
    /**
     * Create a new class instance.
     */

    protected $panduanRepository;

    public function __construct(PanduanRepository $panduanRepository)
    {
        $this->panduanRepository = $panduanRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'file' => 'required|file|mimes:pdf',
        ]);
    }

    public function update(Request $request, string $id)
    {
        try {
            $validator = $this->validateInput($request->only('file'));

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $panduan = $this->panduanRepository->getById($id);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalName();
                $fileName = date('YmdHis') . "-" . $extension;

                if ($panduan->file) {
                    $oldPath = storage_path('app/public/') . $panduan->file;
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $file->move(storage_path('app/public/panduan'), $fileName);
                $filePath = 'panduan/' . $fileName;
            } else {
                $filePath = $panduan->file;
            };

            $validatedData['file'] = $filePath;

            $this->panduanRepository->update($validatedData, $id);

            return to_route('admin.panduan.index')->with('success', 'Panduan berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
