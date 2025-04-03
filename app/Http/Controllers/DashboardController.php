<?php

namespace App\Http\Controllers;

use App\Repositories\GuruRepository;
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
    protected $guruRepository;

    public function __construct(
        ProyekJawabanRepository $proyekJawabanRepository,
        KuisJawabanRepository $kuisJawabanRepository,
        ProyekRepository $proyekRepository,
        KuisRepository $kuisRepository,
        MateriRepository $materiRepository,
        GuruRepository $guruRepository
    )
    {
        $this->proyekJawabanRepository = $proyekJawabanRepository;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
        $this->proyekRepository = $proyekRepository;
        $this->kuisRepository = $kuisRepository;
        $this->materiRepository = $materiRepository;
        $this->guruRepository = $guruRepository;
    }

    public function siswa()
    {
        $latestProyekNilai = $this->proyekJawabanRepository->getLatestNilai();
        $latestKuisNilai = $this->kuisJawabanRepository->getLatestNilai();
        $proyeks = $this->proyekRepository->getBySiswa();
        $kuises = $this->kuisRepository->getBySiswa();
        $materis = $this->materiRepository->getBySiswa();
        $latestProyek = $proyeks->take(1);
        $latestKuis = $kuises->take(1);
        $latestMateri = $materis->take(1);

        return Inertia::render('siswa/dashboard-siswa', compact(
            'latestProyekNilai', 'latestKuisNilai', 'proyeks', 'kuises', 'materis', 'latestProyek', 'latestKuis', 'latestMateri'
        ));
    }

    public function guru()
    {
        $kelases = $this->guruRepository->getKelasGuru()->count();
        $mapels = $this->guruRepository->getMapelGuru()->count();
        $siswas = $this->guruRepository->getSiswaGuru()->count();
        $proyeks = $this->proyekRepository->getByGuru();
        $kuises = $this->kuisRepository->getByGuru();
        $materis = $this->materiRepository->getByGuru();
        $latestProyek = $proyeks->take(1);
        $latestKuis = $kuises->take(1);
        $latestMateri = $materis->take(1);

        return Inertia::render('guru/dashboard-guru', compact(
            'kelases', 'mapels', 'siswas', 'proyeks', 'kuises', 'materis', 'latestProyek', 'latestKuis', 'latestMateri'
        ));
    }

    public function admin()
    {
        return Inertia::render('admin/dashboard-admin', compact(''));
    }
}
