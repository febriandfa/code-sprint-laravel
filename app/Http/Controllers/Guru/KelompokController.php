<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Services\KelompokService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelompokController extends Controller
{
    protected $kelompokRepository;
    protected $kelompokService;

    public function __construct(KelompokRepository $kelompokRepository, KelompokService $kelompokService)
    {
        $this->kelompokRepository = $kelompokRepository;
        $this->kelompokService = $kelompokService;
    }

    public function index()
    {
        $kelompoks = $this->kelompokRepository->getAll();

        return Inertia::render('guru/kelompok/index', compact('kelompoks'));
    }

    public function create()
    {
        return Inertia::render('guru/kelompok/create');
    }

    public function store(Request $request)
    {
        return $this->kelompokService->create($request);
    }

    public function edit($id)
    {
        $kelompok = $this->kelompokRepository->getById($id);

        return Inertia::render('guru/kelompok/edit', compact('kelompok'));
    }

    public function update(Request $request, $id)
    {
        return $this->kelompokService->update($request, $id);
    }

    public function destroy($id)
    {
        $this->kelompokRepository->delete($id);

        return redirect()->back()->with('success', 'Kelompok berhasil dihapus');
    }
}
