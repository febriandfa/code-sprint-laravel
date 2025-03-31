<?php

namespace App\Http\Controllers\Guru;

use App\Enums\SyntaxEnum;
use App\Http\Controllers\Controller;
use App\Repositories\GuruRepository;
use App\Repositories\KelompokRepository;
use App\Repositories\MateriRepository;
use App\Repositories\ProyekJawabanRepository;
use App\Repositories\ProyekRepository;
use App\Services\ProyekService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $proyekService;
    protected $guruRepository;
    protected $materiRepository;
    protected $kelompokRepository;
    protected $proyekJawabanRepository;

    public function __construct(
        ProyekRepository $proyekRepository,
        ProyekService $proyekService,
        GuruRepository $guruRepository,
        MateriRepository $materiRepository,
        KelompokRepository $kelompokRepository,
        ProyekJawabanRepository $proyekJawabanRepository
    )
    {
        $this->proyekRepository = $proyekRepository;
        $this->proyekService = $proyekService;
        $this->guruRepository = $guruRepository;
        $this->materiRepository = $materiRepository;
        $this->kelompokRepository = $kelompokRepository;
        $this->proyekJawabanRepository = $proyekJawabanRepository;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getByGuru();

        return Inertia::render('guru/proyek/index', compact('proyeks'));
    }

    public function create()
    {
        $materis = $this->materiRepository->getByGuru();

        return Inertia::render('guru/proyek/create', compact('materis'));
    }

    public function store(Request $request)
    {
        return $this->proyekService->create($request);
    }

    public function show($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $kelompoks = $this->kelompokRepository->getAll($id);

        return Inertia::render('guru/proyek/show', compact('proyek', 'kelompoks'));
    }

    public function edit($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $materis = $this->materiRepository->getByGuru();

        return Inertia::render('guru/proyek/edit', compact('proyek', 'materis'));
    }

    public function update(Request $request, $id)
    {
        return $this->proyekService->update($request, $id);
    }

    public function destroy($id)
    {
        $this->proyekRepository->delete($id);

        return redirect()->back()->with('success', 'Proyek berhasil dihapus');
    }

    public function syntaxOne(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_ONE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-one', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxTwo(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_TWO;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-two', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxThree(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_THREE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-three', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxFour(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_FOUR;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $jadwals = $this->proyekJawabanRepository->getJadwalByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-four', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'jadwals', 'nilai'
        ));
    }

    public function syntaxFive(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_FIVE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-five', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxSix(string $id, string $kelompokId)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_SIX;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getByIdWithAnggota($kelompokId);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompokId);
        $nilai = $this->proyekRepository->getNilaiByProyekIdKelompokId($proyek->id, $kelompokId);

        return Inertia::render('guru/proyek/syntax-six', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }
}
