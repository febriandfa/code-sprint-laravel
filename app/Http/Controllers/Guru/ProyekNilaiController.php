<?php

namespace App\Http\Controllers\Guru;

use App\Enums\SyntaxEnum;
use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Repositories\ProyekJawabanRepository;
use App\Repositories\ProyekNilaiRepository;
use App\Repositories\ProyekRepository;
use App\Services\ProyekNilaiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekNilaiController extends Controller
{
    protected $proyekNilaiRepository;
    protected $proyekNilaiService;
    protected $proyekRepository;
    protected $kelompokRepository;
    protected $proyekJawabanRepository;

    public function __construct(
        ProyekNilaiRepository $proyekNilaiRepository,
        ProyekNilaiService $proyekNilaiService,
        ProyekRepository $proyekRepository,
        KelompokRepository $kelompokRepository,
        ProyekJawabanRepository $proyekJawabanRepository
    )
    {
        $this->proyekNilaiRepository = $proyekNilaiRepository;
        $this->proyekNilaiService = $proyekNilaiService;
        $this->proyekRepository = $proyekRepository;
        $this->kelompokRepository = $kelompokRepository;
        $this->proyekJawabanRepository = $proyekJawabanRepository;
    }

    public function create(Request $request, string $proyekId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_SIX;
        $proyek = $this->proyekRepository->getById($proyekId);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($request->kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $request->kelompokId);

        return Inertia::render('guru/proyek-nilai/create', compact('currentSyntax', 'proyek', 'kelompok', 'jawaban'));
    }

    public function store(Request $request, string $proyekId)
    {
        return $this->proyekNilaiService->create($request, $proyekId);
    }

    public function edit(string $proyekId, string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_SIX;
        $nilai = $this->proyekNilaiRepository->getById($id);
        $proyek = $this->proyekRepository->getById($proyekId);
        $kelompok = $this->kelompokRepository->getById($nilai->kelompok_id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $nilai->kelompok_id);

        return Inertia::render('guru/proyek-nilai/edit', compact('currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'));
    }

    public function update(Request $request, string $proyekId, string $id)
    {
        return $this->proyekNilaiService->update($request, $id);
    }
}
