<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Services\KelompokService;
use Illuminate\Http\Request;

class KelompokController extends Controller
{
    protected $kelompokService;

    public function __construct(KelompokService $kelompokService)
    {
        $this->kelompokService = $kelompokService;
    }

    public function join(string $kelompokId)
    {
        return $this->kelompokService->join($kelompokId);
    }
}
