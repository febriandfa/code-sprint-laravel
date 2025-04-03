<?php

namespace App\Http\Controllers;

use App\Repositories\KuisJawabanRepository;
use App\Repositories\ProyekJawabanRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $proyekJawabanRepository;
    protected $kuisJawabanRepository;

    public function __construct(
        ProyekJawabanRepository $proyekJawabanRepository,
        KuisJawabanRepository $kuisJawabanRepository
    )
    {
        $this->proyekJawabanRepository = $proyekJawabanRepository;
        $this->kuisJawabanRepository = $kuisJawabanRepository;
    }

    public function siswa()
    {
        $latestProyekNilai = $this->proyekJawabanRepository->getLatestNilai();
        $latestKuisNilai = $this->kuisJawabanRepository->getLatestNilai();

        return Inertia::render('siswa/dashboard-siswa', compact('latestProyekNilai', 'latestKuisNilai'));
    }
}
