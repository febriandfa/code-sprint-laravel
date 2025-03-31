<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Services\ProyekJawabanService;
use Illuminate\Http\Request;

class ProyekJawabanController extends Controller
{
    protected $proyekJawabanService;

    public function __construct(ProyekJawabanService $proyekJawabanService)
    {
        $this->proyekJawabanService = $proyekJawabanService;
    }

    public function update(Request $request, string $proyekId, string $id)
    {
        return $this->proyekJawabanService->update($request, $id);
    }
}
