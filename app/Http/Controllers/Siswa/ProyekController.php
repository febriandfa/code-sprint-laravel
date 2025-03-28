<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $kelompokRepository;

    public function __construct(ProyekRepository $proyekRepository, KelompokRepository $kelompokRepository)
    {
        $this->proyekRepository = $proyekRepository;
        $this->kelompokRepository = $kelompokRepository;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getBySiswa();

        return Inertia::render('siswa/proyek/index', compact('proyeks'));
    }

    public function show($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyek($id);

        return Inertia::render('siswa/proyek/show', compact('proyek', 'kelompok'));
    }

    public function kelompok($id)
    {
        $kelompoks = $this->kelompokRepository->getAll($id);
        $proyek = $this->proyekRepository->getById($id);
        $isJoined = $this->kelompokRepository->checkIsJoined($id);

        return Inertia::render('siswa/proyek/kelompok', compact('kelompoks', 'proyek', 'isJoined'));
    }
}
