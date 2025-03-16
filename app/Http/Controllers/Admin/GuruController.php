<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleType;
use App\Http\Controllers\Controller;
use App\Repositories\KelasRepository;
use App\Repositories\MapelRepository;
use App\Repositories\UserRepository;
use App\Services\GuruService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuruController extends Controller
{
    protected $guruService;
    protected $userRepository;
    protected $mapelRepository;
    protected $kelasRepository;

    public function __construct(GuruService $guruService, UserRepository $userRepository, MapelRepository $mapelRepository, KelasRepository $kelasRepository)
    {
        $this->guruService = $guruService;
        $this->userRepository = $userRepository;
        $this->mapelRepository = $mapelRepository;
        $this->kelasRepository = $kelasRepository;
    }

    public function index()
    {
        $gurus = $this->userRepository->getAll(RoleType::GURU);

        return Inertia::render('admin/guru/index', compact('gurus'));
    }

    public function create()
    {
        $kelases = $this->kelasRepository->getAll();
        $mapels = $this->mapelRepository->getAll();

        return Inertia::render('admin/guru/create', compact('kelases', 'mapels'));
    }

    public function store(Request $request)
    {
        return $this->guruService->create($request);
    }

    public function edit(string $id)
    {
        $guru = $this->userRepository->getById($id);
        $kelases = $this->kelasRepository->getAll();
        $mapels = $this->mapelRepository->getAll();

        return Inertia::render('admin/guru/edit', compact('guru', 'kelases', 'mapels'));
    }

    public function update(Request $request, string $id)
    {
        return $this->guruService->update($request, $id);
    }

    public function destroy(string $id)
    {
        return $this->guruService->delete($id);
    }
}
