<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PanduanRepository;
use App\Services\PanduanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PanduanController extends Controller
{
    protected $panduanRepository;
    protected $panduanService;

    public function __construct(PanduanRepository $panduanRepository, PanduanService $panduanService)
    {
        $this->panduanRepository = $panduanRepository;
        $this->panduanService = $panduanService;
    }

    public function index()
    {
        $panduans = $this->panduanRepository->getAll();

        return Inertia::render('admin/panduan/index', compact('panduans'));
    }

    public function edit(string $id)
    {
        $panduan = $this->panduanRepository->getById($id);

        return Inertia::render('admin/panduan/edit', compact('panduan'));
    }

    public function update(Request $request, string $id)
    {
        return $this->panduanService->update($request, $id);
    }
}
