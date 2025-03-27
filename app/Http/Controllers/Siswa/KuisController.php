<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\KuisRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KuisController extends Controller
{
    protected $kuisRepository;

    public function __construct(KuisRepository $kuisRepository)
    {
        $this->kuisRepository = $kuisRepository;
    }

    public function index()
    {
        $kuises = $this->kuisRepository->getBySiswa();

        return Inertia::render('siswa/kuis/index', compact('kuises'));
    }
}
