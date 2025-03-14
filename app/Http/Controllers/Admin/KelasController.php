<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\KelasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    protected $kelasService;

    public function __construct(KelasService $kelasService)
    {
        $this->kelasService = $kelasService;
    }

    public function index()
    {
        $kelases = $this->kelasService->getAll();

        return Inertia::render('admin/kelas/index', compact('kelases'));
    }

    public function create()
    {
        return Inertia::render('admin/kelas/create');
    }

    public function store(Request $request)
    {
        return $this->kelasService->create($request);
    }

    public function edit(string $id)
    {
        return Inertia::render('admin/kelas/edit');
    }

    public function update(Request $request, string $id)
    {
        return $this->kelasService->update($request, $id);
    }

    public function destroy(string $id)
    {
        return $this->kelasService->delete($id);
    }
}
