<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\GuruRepository;
use App\Repositories\MateriRepository;
use App\Services\MateriService;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class MateriController extends Controller
{
    protected $materiService;
    protected $materiRepository;
    protected $guruRepository;

    public function __construct(MateriService $materiService, MateriRepository $materiRepository, GuruRepository $guruRepository)
    {
        $this->materiService = $materiService;
        $this->materiRepository = $materiRepository;
        $this->guruRepository = $guruRepository;
    }

    public function index()
    {
        $materis = $this->materiRepository->getByGuru();

        return Inertia::render('guru/materi/index', compact('materis'));
    }

    public function create()
    {
        $mapels = $this->guruRepository->getMapelGuru();
        $kelases = $this->guruRepository->getKelasGuru();

        return Inertia::render('guru/materi/create', compact('mapels', 'kelases'));
    }

    public function store(Request $request)
    {
        return $this->materiService->create($request);
    }

    public function show($id)
    {
        $materi = $this->materiRepository->getById($id);

        return Inertia::render('guru/materi/show', compact('materi'));
    }

    public function edit($id)
    {
        $materi = $this->materiRepository->getById($id);
        $mapels = $this->guruRepository->getMapelGuru();
        $kelases = $this->guruRepository->getKelasGuru();

        return Inertia::render('guru/materi/edit', compact('materi', 'mapels', 'kelases'));
    }

    public function update(Request $request, $id)
    {
        return $this->materiService->update($request, $id);
    }

    public function destroy($id)
    {
        return $this->materiService->delete($id);
    }
}
