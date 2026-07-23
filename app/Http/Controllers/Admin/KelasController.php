<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\KelasRepository;
use App\Services\KelasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    protected $kelasService;
    protected $kelasRepository;

    public function __construct(KelasService $kelasService, KelasRepository $kelasRepository)
    {
        $this->kelasService = $kelasService;
        $this->kelasRepository = $kelasRepository;
    }

    public function index()
    {
        $kelases = $this->kelasRepository->getAll();

        return Inertia::render('admin/kelas/index', compact('kelases'));
    }

    public function create()
    {
        $waliKelases = $this->kelasRepository->getWaliKelas();

        return Inertia::render('admin/kelas/create', compact('waliKelases'));
    }

    public function store(Request $request)
    {
        return $this->kelasService->create($request);
    }

    public function edit(string $id)
    {
        $kelas = $this->kelasRepository->getById($id);
        $waliKelases = $this->kelasRepository->getWaliKelas();

        return Inertia::render('admin/kelas/edit', compact('kelas', 'waliKelases'));
    }

    public function update(Request $request, string $id)
    {
        return $this->kelasService->update($request, $id);
    }

    public function destroy(string $id)
    {
        return $this->kelasService->delete($id);
    }
}
