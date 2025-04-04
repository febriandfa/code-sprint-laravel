<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\KuisJawabanRepository;
use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use App\Services\KuisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KuisController extends Controller
{
    protected $kuisRepository;
    protected $kuisSoalRepository;
    protected $kuisService;
    protected $kuisJawabanRepository;

    public function __construct(
        KuisRepository $kuisRepository,
        KuisSoalRepository $kuisSoalRepository,
        KuisService $kuisService,
        KuisJawabanRepository $kuisJawabanRepository
    )
    {
        $this->kuisRepository = $kuisRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
        $this->kuisService = $kuisService;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
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

    public function hasil(string $id)
    {
        $kuis = $this->kuisRepository->getById($id);
        $soals = $this->kuisSoalRepository->getAllByKuisId($id);
        $hasilSiswa = $this->kuisJawabanRepository->getHasilByKuisIdSiswaId($id, Auth::user()->id);
        $jawabans = $this->kuisJawabanRepository->getJawabanByKuisIdSiswaId($id, Auth::user()->id);

        return Inertia::render('siswa/kuis/jawaban', compact('kuis', 'soals', 'hasilSiswa', 'jawabans'));
    }
}
