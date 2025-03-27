<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
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

    public function __construct(
        KuisService $kuisService,
        KuisRepository $kuisRepository,
        MateriRepository $materiRepository,
        KuisSoalRepository $kuisSoalRepository
    )
    {
        $this->kuisService = $kuisService;
        $this->kuisRepository = $kuisRepository;
        $this->materiRepository = $materiRepository;
        $this->kuisSoalRepository = $kuisSoalRepository;
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
}
