<?php

namespace App\Services;

use App\Repositories\MateriRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'kelas_id' => 'required|exists:kelases,id',
            'mapel_id' => 'required|exists:mapels,id',
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'file_materi' => 'nullable|file|mimes:pdf',
            'file_modul' => 'nullable|file|mimes:pdf',
            'video_materi' => 'nullable|file|mimes:mp4,mov,avi,wmv',
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
                $materiName = date('YmdHis') . "-" . $extension;
                $fileMateri->move(storage_path('app/public/materi/materi'), $materiName);
                // $fileMateri->move(public_path('storage/materi/materi'), $materiName);
                $materiPath = 'materi/materi/' . $materiName;
            };

            $modulPath = null;
            if ($request->hasFile('file_modul')) {
                $fileModul = $request->file('file_modul');
                $extension = $fileModul->getClientOriginalName();
                $modulName = date('YmdHis') . "-" . $extension;
                $fileModul->move(storage_path('app/public/materi/modul'), $modulName);
                // $fileModul->move(public_path('storage/materi/modul'), $modulName);
                $modulPath = 'materi/modul/' . $modulName;
            };

            $videoPath = null;
            if ($request->hasFile('video_materi')) {
                $fileVideo = $request->file('video_materi');
                $extension = $fileVideo->getClientOriginalName();
                $videoName = date('YmdHis') . "-" . $extension;
                $fileVideo->move(storage_path('app/public/materi/video'), $videoName);
                // $fileVideo->move(public_path('storage/materi/video'), $videoName);
                $videoPath = 'materi/video/' . $videoName;
            };

            $this->materiRepository->create([
                'kelas_id' => $validatedData['kelas_id'],
                'mapel_id' => $validatedData['mapel_id'],
                'judul' => $validatedData['judul'],
                'deskripsi' => $validatedData['deskripsi'],
                'file_materi' => $materiPath,
                'file_modul' => $modulPath,
                'video_materi' => $videoPath,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect()->back()->with('success', 'Materi berhasil ditambahkan');
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
                $materiName = date('YmdHis') . "-" . $extension;

                if ($materi->file_materi) {
                    $oldPath = storage_path('app/public') . $materi->file_materi;
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $fileMateri->move(storage_path('app/public/materi'), $materiName);
                $materiPath = 'materi/materi/' . $materiName;
            } else {
                $materiPath = $materi->file_materi;
            };

            if ($request->hasFile('file_modul')) {
                $fileModul = $request->file('file_modul');
                $extension = $fileModul->getClientOriginalName();
                $modulName = date('YmdHis') . "-" . $extension;

                if ($materi->file_modul) {
                    $oldPath = storage_path('app/public') . $materi->file_modul;
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $fileModul->move(storage_path('app/public/modul'), $modulName);
                $modulPath = 'materi/modul/' . $modulName;
            } else {
                $modulPath = $materi->file_modul;
            };

            if ($request->hasFile('video_materi')) {
                $fileVideo = $request->file('video_materi');
                $extension = $fileVideo->getClientOriginalName();
                $videoName = date('YmdHis') . "-" . $extension;

                if ($materi->video_materi) {
                    $oldPath = storage_path('app/public') . $materi->video_materi;
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $fileVideo->move(storage_path('app/public/video'), $videoName);
                $videoPath = 'materi/video/' . $videoName;
            } else {
                $videoPath = $materi->video_materi;
            };

            $this->materiRepository->update([
                'kelas_id' => $validatedData['kelas_id'],
                'mapel_id' => $validatedData['mapel_id'],
                'judul' => $validatedData['judul'],
                'deskripsi' => $validatedData['deskripsi'],
                'file_materi' => $materiPath,
                'file_modul' => $modulPath,
                'video_materi' => $videoPath,
            ], $id);

            return to_route('guru.materi.index')->with('success', 'Materi berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $materi = $this->materiRepository->getById($id);

            if ($materi->file_materi) {
                $oldPath = storage_path('app/public') . $materi->file_materi;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            if ($materi->file_modul) {
                $oldPath = storage_path('app/public') . $materi->file_modul;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            if ($materi->video_materi) {
                $oldPath = storage_path('app/public') . $materi->video_materi;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            $this->materiRepository->delete($id);

            return redirect()->back()->with('success', 'Materi berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
