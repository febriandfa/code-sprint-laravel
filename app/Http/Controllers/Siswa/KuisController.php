<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use App\Services\KuisService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KuisController extends Controller
{
    protected $kuisRepository;
    protected $kuisSoalRepository;
    protected $kuisService;

    public function __construct(KuisRepository $kuisRepository, KuisSoalRepository $kuisSoalRepository, KuisService $kuisService)
    {
        $this->kuisRepository = $kuisRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
        $this->kuisService = $kuisService;
    }

    public function index()
    {
        $kuises = $this->kuisRepository->getBySiswa();

        return Inertia::render('siswa/kuis/index', compact('kuises'));
    }

    public function show($id)
    {
        $kuis = $this->kuisRepository->getById($id);
        $soals = $this->kuisSoalRepository->getAllByKuisId($id);

        return Inertia::render('siswa/kuis/show', compact('kuis', 'soals'));
    }

    public function answer(Request $request)
    {
        return $this->kuisService->answer($request);
    }
}
