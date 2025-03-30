<?php

namespace App\Http\Controllers\Siswa;

use App\Enums\SyntaxEnum;
use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Repositories\ProyekRepository;
use App\Services\ProyekService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $kelompokRepository;
    protected $proyekService;

    public function __construct(
        ProyekRepository $proyekRepository,
        KelompokRepository $kelompokRepository,
        ProyekService $proyekService
    )
    {
        $this->proyekRepository = $proyekRepository;
        $this->kelompokRepository = $kelompokRepository;
        $this->proyekService = $proyekService;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getBySiswa();

        return Inertia::render('siswa/proyek/index', compact('proyeks'));
    }

    public function show($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyek($id);

        return Inertia::render('siswa/proyek/show', compact('proyek', 'kelompok'));
    }

    public function kelompok($id)
    {
        $kelompoks = $this->kelompokRepository->getAll($id);
        $proyek = $this->proyekRepository->getById($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);

        return Inertia::render('siswa/proyek/kelompok', compact('kelompoks', 'proyek', 'joinedKelompok'));
    }

    public function syntaxOne(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_ONE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyek($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);

        return Inertia::render('siswa/proyek/syntax-one', compact('currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban'));
    }

    public function syntaxTwo(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_TWO;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyek($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);

        return Inertia::render('siswa/proyek/syntax-two', compact('currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban'));
    }

    public function syntaxThree(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_THREE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyek($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);

        return Inertia::render('siswa/proyek/syntax-three', compact('currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban'));
    }

    public function store(Request $request, string $id)
    {
        return $this->proyekService->storeAnswer($request, $id);
    }

    public function update(Request $request, string $id, string $answerId)
    {
        return $this->proyekService->updateAnswer($request, $answerId);
    }
}
