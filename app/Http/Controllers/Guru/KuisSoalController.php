<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use App\Services\KuisSoalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KuisSoalController extends Controller
{
    protected $kuisRepository;
    protected $kuisSoalRepository;
    protected $kuisSoalService;

    public function __construct(KuisRepository $kuisRepository, KuisSoalRepository $kuisSoalRepository, KuisSoalService $kuisSoalService)
    {
        $this->kuisRepository = $kuisRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
        $this->kuisSoalService = $kuisSoalService;
    }

    public function create(string $kuisId)
    {
        $kuis = $this->kuisRepository->getById($kuisId);
        $soals = $this->kuisSoalRepository->getAllByKuisId($kuisId);

        return Inertia::render('guru/kuis/soal', compact('kuis', 'soals'));
    }

    public function store(Request $request, string $kuisId)
    {
        return $this->kuisSoalService->create($request, $kuisId);
    }

    public function update(Request $request, string $kuisId, string $soalId)
    {
        return $this->kuisSoalService->update($request, $kuisId, $soalId);
    }

    public function destroy(string $kuisId, string $soalId)
    {
        $this->kuisSoalService->delete($kuisId, $soalId);
    }
}
