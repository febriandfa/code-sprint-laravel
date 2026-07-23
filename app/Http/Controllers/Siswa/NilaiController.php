<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Repositories\NilaiRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiController extends Controller
{
    protected $nilaiRepository;

    public function __construct(NilaiRepository $nilaiRepository)
    {
        $this->nilaiRepository = $nilaiRepository;
    }

    public function index()
    {
        $nilais = $this->nilaiRepository->getAllBySiswa(Auth::user()->id);

        return Inertia::render('siswa/nilai/index', compact('nilais'));
    }
}
