<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\GuruRepository;
use App\Repositories\ProyekRepository;
use App\Services\ProyekService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $proyekService;
    protected $guruRepository;

    public function __construct(ProyekRepository $proyekRepository, ProyekService $proyekService, GuruRepository $guruRepository)
    {
        $this->proyekRepository = $proyekRepository;
        $this->proyekService = $proyekService;
        $this->guruRepository = $guruRepository;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getByGuru();

        return Inertia::render('guru/proyek/index', compact('proyeks'));
    }

    public function create()
    {
        $mapels = $this->guruRepository->getMapelGuru();
        $kelases = $this->guruRepository->getKelasGuru();

        return Inertia::render('guru/proyek/create', compact('mapels', 'kelases'));
    }

    public function store(Request $request)
    {
        return $this->proyekService->create($request);
    }

    public function edit($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $mapels = $this->guruRepository->getMapelGuru();
        $kelases = $this->guruRepository->getKelasGuru();

        return Inertia::render('guru/proyek/edit', compact('proyek', 'mapels', 'kelases'));
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
