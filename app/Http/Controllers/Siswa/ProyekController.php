<?php

namespace App\Http\Controllers\Siswa;

use App\Enums\SyntaxEnum;
use App\Http\Controllers\Controller;
use App\Repositories\KelompokRepository;
use App\Repositories\ProyekJawabanRepository;
use App\Repositories\ProyekNilaiRepository;
use App\Repositories\ProyekRepository;
use App\Services\ProyekService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    protected $proyekRepository;
    protected $proyekJawabanRepository;
    protected $kelompokRepository;
    protected $proyekService;
    protected $proyekNilaiRepository;

    public function __construct(
        ProyekRepository $proyekRepository,
        ProyekJawabanRepository $proyekJawabanRepository,
        KelompokRepository $kelompokRepository,
        ProyekService $proyekService,
        ProyekNilaiRepository $proyekNilaiRepository
    )
    {
        $this->proyekRepository = $proyekRepository;
        $this->proyekJawabanRepository = $proyekJawabanRepository;
        $this->kelompokRepository = $kelompokRepository;
        $this->proyekService = $proyekService;
        $this->proyekNilaiRepository = $proyekNilaiRepository;
    }

    public function index()
    {
        $proyeks = $this->proyekRepository->getBySiswa();

        return Inertia::render('siswa/proyek/index', compact('proyeks'));
    }

    public function show($id)
    {
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);

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
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-one', compact(
            'currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxTwo(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_TWO;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-two', compact(
            'currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxThree(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_THREE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-three', compact(
            'currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxFour(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_FOUR;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $jadwals = $this->proyekJawabanRepository->getJadwalByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-four', compact(
            'currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban', 'jadwals', 'nilai'
        ));
    }

    public function syntaxFive(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_FIVE;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $joinedKelompok = $this->kelompokRepository->getJoinedKelompok($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-five', compact(
            'currentSyntax', 'proyek', 'kelompok', 'joinedKelompok', 'jawaban', 'nilai'
        ));
    }

    public function syntaxSix(string $id)
    {
        $currentSyntax = SyntaxEnum::SYNTAX_SIX;
        $proyek = $this->proyekRepository->getById($id);
        $kelompok = $this->kelompokRepository->getKelompokByCurrentProyekAndUser($id);
        $jawaban = $this->proyekJawabanRepository->getJawabanByProyekIdKelompokId($proyek->id, $kelompok->id);
        $nilai = $this->proyekNilaiRepository->getByProyekIdUserId($proyek->id);

        return Inertia::render('siswa/proyek/syntax-six', compact(
            'currentSyntax', 'proyek', 'kelompok', 'jawaban', 'nilai'
        ));
    }
}
