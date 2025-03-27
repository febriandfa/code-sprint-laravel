<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;

    public function __construct(ProyekRepository $proyekRepository)
    {
        $this->proyekRepository = $proyekRepository;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getBySiswa();

        return Inertia::render('siswa/proyek/index', compact('proyeks'));
    }
}
