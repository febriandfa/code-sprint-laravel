<?php

namespace App\Http\Controllers;

use App\Repositories\KuisJawabanRepository;
use App\Repositories\KuisRepository;
use App\Repositories\MateriRepository;
use App\Repositories\ProyekJawabanRepository;
use App\Repositories\ProyekRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $proyekJawabanRepository;
    protected $kuisJawabanRepository;
    protected $proyekRepository;
    protected $kuisRepository;
    protected $materiRepository;

    public function __construct(
        ProyekJawabanRepository $proyekJawabanRepository,
        KuisJawabanRepository $kuisJawabanRepository,
        ProyekRepository $proyekRepository,
        KuisRepository $kuisRepository,
        MateriRepository $materiRepository
    )
    {
        $this->proyekJawabanRepository = $proyekJawabanRepository;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
        $this->proyekRepository = $proyekRepository;
        $this->kuisRepository = $kuisRepository;
        $this->materiRepository = $materiRepository;

    }

    public function siswa()
    {
        $latestProyekNilai = $this->proyekJawabanRepository->getLatestNilai();
        $latestKuisNilai = $this->kuisJawabanRepository->getLatestNilai();
        $proyeks = $this->proyekRepository->getBySiswa();
        $kuises = $this->kuisRepository->getBySiswa();
        $materis = $this->materiRepository->getBySiswa();
        $latestProyek = $this->proyekRepository->getBySiswa()->take(1);
        $latestKuis = $this->kuisRepository->getBySiswa()->take(1);
        $latestMateri = $this->materiRepository->getBySiswa()->take(1);

        return Inertia::render('siswa/dashboard-siswa', compact(
            'latestProyekNilai', 'latestKuisNilai', 'proyeks', 'kuises', 'materis', 'latestProyek', 'latestKuis', 'latestMateri'
        ));
    }
}
