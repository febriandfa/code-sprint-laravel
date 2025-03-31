<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Repositories\ProyekRepository;
use App\Services\KelompokService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelompokController extends Controller
{
    protected $kelompokRepository;
    protected $kelompokService;
    protected $proyekRepository;

    public function __construct(KelompokRepository $kelompokRepository, KelompokService $kelompokService, ProyekRepository $proyekRepository)
    {
        $this->kelompokRepository = $kelompokRepository;
        $this->kelompokService = $kelompokService;
        $this->proyekRepository = $proyekRepository;
    }

    public function index(string $proyekId)
    {
        ///
    }

    public function create(string $proyekId)
    {
        $proyek = $this->proyekRepository->getById($proyekId);
        $ketuaCandidates = $this->kelompokRepository->getKetuaCandidate($proyekId);

        return Inertia::render('guru/kelompok/create', compact('proyek', 'ketuaCandidates'));
    }

    public function store(Request $request, string $proyekId)
    {
        return $this->kelompokService->create($request, $proyekId);
    }

    public function show(string $proyekId, string $id)
    {
        $proyek = $this->proyekRepository->getById($proyekId);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($id);

        return Inertia::render('guru/kelompok/show', compact('proyek', 'kelompok'));
    }

    public function edit(string $proyekId, string $id)
    {
        $proyek = $this->proyekRepository->getById($proyekId);
        $kelompok = $this->kelompokRepository->getById($id);
        $ketuaCandidates = $this->kelompokRepository->getKetuaCandidate($proyekId);

        return Inertia::render('guru/kelompok/edit', compact('proyek', 'ketuaCandidates', 'kelompok'));
    }

    public function update(Request $request, string $proyekId, string $id)
    {
        return $this->kelompokService->update($request, $id);
    }

    public function destroy($id)
    {
        $this->kelompokRepository->delete($id);

        return redirect()->back()->with('success', 'Kelompok berhasil dihapus');
    }
}
