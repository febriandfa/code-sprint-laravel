<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\MateriRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriController extends Controller
{
    protected $materiRepository;

    public function __construct(MateriRepository $materiRepository)
    {
        $this->materiRepository = $materiRepository;
    }

    public function index()
    {
        $materis = $this->materiRepository->getBySiswa();

        return Inertia::render('siswa/materi/index', compact('materis'));
    }

    public function show(string $id)
    {
        $materi = $this->materiRepository->getById($id);

        return Inertia::render('siswa/materi/show', compact('materi'));
    }
}
