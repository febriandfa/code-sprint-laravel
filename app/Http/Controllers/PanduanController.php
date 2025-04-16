<?php

namespace App\Http\Controllers;

use App\Repositories\PanduanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PanduanController extends Controller
{
    protected $panduanRepository;

    public function __construct(PanduanRepository $panduanRepository)
    {
        $this->panduanRepository = $panduanRepository;
    }

    public function panduan()
    {
        $role = Auth::user()->role;
        $panduan = $this->panduanRepository->getByRole($role);

        return Inertia::render('auth/panduan', compact('panduan'));
    }
}
