<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\MapelRepository;
use App\Services\MapelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapelController extends Controller
{
    protected $mapelService;
    protected $mapelRepository;

    public function __construct(MapelService $mapelService, MapelRepository $mapelRepository)
    {
        $this->mapelService = $mapelService;
        $this->mapelRepository = $mapelRepository;
    }

    public function index()
    {
        $mapels = $this->mapelRepository->getAll();

        return Inertia::render('admin/mapel/index', compact('mapels'));
    }

    public function create()
    {
        return Inertia::render('admin/mapel/create');
    }

    public function store(Request $request)
    {
        return $this->mapelService->create($request);
    }

    public function edit(string $id)
    {
        $mapel = $this->mapelRepository->getById($id);

        return Inertia::render('admin/mapel/edit', compact('mapel'));
    }

    public function update(Request $request, string $id)
    {
        return $this->mapelService->update($request, $id);
    }

    public function destroy(string $id)
    {
        return $this->mapelService->delete($id);
    }
}
