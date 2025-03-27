<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\KuisJawabanRepository;
use App\Repositories\KuisRepository;
use App\Repositories\KuisSoalRepository;
use App\Repositories\MateriRepository;
use App\Services\KuisService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KuisController extends Controller
{
    protected $kuisService;
    protected $kuisRepository;
    protected $materiRepository;
    protected $kuisSoalRepository;
    protected $kuisJawabanRepository;

    public function __construct(
        KuisService $kuisService,
        KuisRepository $kuisRepository,
        MateriRepository $materiRepository,
        KuisSoalRepository $kuisSoalRepository,
        KuisJawabanRepository $kuisJawabanRepository
    )
    {
        $this->kuisService = $kuisService;
        $this->kuisRepository = $kuisRepository;
        $this->materiRepository = $materiRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
    }

    public function index()
    {
        $kuises = $this->kuisRepository->getByGuru();

        return Inertia::render('guru/kuis/index', compact('kuises'));
    }

    public function create()
    {
        $materis = $this->materiRepository->getByGuru();

        return Inertia::render('guru/kuis/create', compact('materis'));
    }

    public function store(Request $request)
    {
        $this->kuisService->create($request);
    }

    public function show(string $id)
    {
        $kuis = $this->kuisRepository->getById($id);
        $soals = $this->kuisSoalRepository->getAllByKuisId($id);

        return Inertia::render('guru/kuis/show', compact('kuis', 'soals'));
    }

    public function edit($id)
    {
        $kuis = $this->kuisRepository->getById($id);
        $materis = $this->materiRepository->getAll();

        return Inertia::render('guru/kuis/edit', compact('kuis', 'materis'));
    }

    public function update(Request $request, $id)
    {
        $this->kuisService->update($request, $id);
    }

    public function destroy($id)
    {
        $this->kuisRepository->delete($id);
    }

    public function siswa(string $kuisId)
    {
        $kuis = $this->kuisRepository->getById($kuisId);
        $hasilSiswas = $this->kuisJawabanRepository->getAllHasil($kuisId);

        return Inertia::render('guru/kuis/siswa', compact('kuis', 'hasilSiswas'));
    }

    public function hasil(string $kuisId, string $siswaId)
    {
        $kuis = $this->kuisRepository->getById($kuisId);
        $soals = $this->kuisSoalRepository->getAllByKuisId($kuisId);
        $hasilSiswa = $this->kuisJawabanRepository->getHasilByKuisIdSiswaId($kuisId, $siswaId);
        $jawabans = $this->kuisJawabanRepository->getJawabanByKuisIdSiswaId($kuisId, $siswaId);

        return Inertia::render('guru/kuis/jawaban', compact('kuis', 'soals', 'hasilSiswa', 'jawabans'));
    }
}
