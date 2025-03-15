<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\MateriRepository;
use App\Services\MateriService;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class MateriController extends Controller
{
    protected $materiService;
    protected $materiRepository;

    public function __construct(MateriService $materiService, MateriRepository $materiRepository)
    {
        $this->materiService = $materiService;
        $this->materiRepository = $materiRepository;
    }

    public function index()
    {
        $materis = $this->materiRepository->getAll();

        return Inertia::render('guru/materi/index', compact('materis'));
    }

    public function create()
    {
        return Inertia::render('guru/materi/create');
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

        return Inertia::render('guru/materi/edit', compact('materi'));
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
