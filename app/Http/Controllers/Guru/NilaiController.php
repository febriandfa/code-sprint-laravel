<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Repositories\GuruRepository;
use App\Repositories\KelasRepository;
use App\Repositories\NilaiRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NilaiController extends Controller
{
    protected $guruRepository;
    protected $kelasRepository;
    protected $nilaiRepository;
    protected $userRepository;

    public function __construct(
        GuruRepository $guruRepository,
        KelasRepository $kelasRepository,
        NilaiRepository $nilaiRepository,
        UserRepository $userRepository
    )
    {
        $this->guruRepository = $guruRepository;
        $this->kelasRepository = $kelasRepository;
        $this->nilaiRepository = $nilaiRepository;
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $kelases = $this->guruRepository->getKelasGuru();

        return Inertia::render('guru/nilai/index', compact('kelases'));
    }

    public function siswa(string $kelasId)
    {
        $siswas = $this->kelasRepository->getSiswa($kelasId);

        return Inertia::render('guru/nilai/siswa', compact('siswas'));
    }

    public function show(string $siswaId)
    {
        $siswa = $this->userRepository->getById($siswaId);
        $nilais = $this->nilaiRepository->getAllBySiswa($siswaId);

        return Inertia::render('guru/nilai/show', compact('siswa', 'nilais'));
    }
}
