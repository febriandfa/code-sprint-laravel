<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleType;
use App\Http\Controllers\Controller;
use App\Repositories\KelasRepository;
use App\Repositories\UserRepository;
use App\Services\SiswaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    protected $siswaService;
    protected $userRepository;
    protected $kelasRepository;

    public function __construct(SiswaService $siswaService, UserRepository $userRepository, KelasRepository $kelasRepository)
    {
        $this->siswaService = $siswaService;
        $this->userRepository = $userRepository;
        $this->kelasRepository = $kelasRepository;
    }

    public function index()
    {
        $siswas = $this->userRepository->getAll(RoleType::SISWA);

        return Inertia::render('admin/siswa/index', compact('siswas'));
    }

    public function create()
    {
        $kelases = $this->kelasRepository->getAll();

        return Inertia::render('admin/siswa/create', compact('kelases'));
    }

    public function store(Request $request)
    {
        return $this->siswaService->create($request);
    }

    public function edit(string $id)
    {
        $siswa = $this->userRepository->getById($id);
        $kelases = $this->kelasRepository->getAll();

        return Inertia::render('admin/siswa/edit', compact('siswa', 'kelases'));
    }

    public function update(Request $request, string $id)
    {
        return $this->siswaService->update($request, $id);
    }

    public function destroy(string $id)
    {
        return $this->siswaService->delete($id);
    }
}
