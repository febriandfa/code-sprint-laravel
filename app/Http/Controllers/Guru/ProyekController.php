<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\ProyekRepository;
use App\Services\ProyekService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $proyekService;

    public function __construct(ProyekRepository $proyekRepository, ProyekService $proyekService)
    {
        $this->proyekRepository = $proyekRepository;
        $this->proyekService = $proyekService;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getAll();

        return Inertia::render('guru/proyek/index', compact('proyeks'));
    }

    public function create()
    {
        return Inertia::render('guru/proyek/create');
    }

    public function store(Request $request)
    {
        return $this->proyekService->create($request);
    }

    public function edit($id)
    {
        $proyek = $this->proyekRepository->getById($id);

        return Inertia::render('guru/proyek/edit', compact('proyek'));
    }

    public function update(Request $request, $id)
    {
        return $this->proyekService->update($request, $id);
    }

    public function destroy($id)
    {
        $this->proyekRepository->delete($id);

        return redirect()->back()->with('success', 'Proyek berhasil dihapus');
    }
}
