<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MapelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapelController extends Controller
{
    protected $mapelService;

    public function __construct(MapelService $mapelService)
    {
        $this->mapelService = $mapelService;
    }

    public function index()
    {
        return Inertia::render('admin/mapel/index');
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
        return Inertia::render('admin/mapel/edit');
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
