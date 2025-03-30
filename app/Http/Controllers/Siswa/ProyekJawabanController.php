<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Services\ProyekJawabanService;
use App\Services\ProyekService;
use Illuminate\Http\Request;

class ProyekJawabanController extends Controller
{
    protected $proyekJawabanService;

    public function __construct(ProyekJawabanService $proyekJawabanService)
    {
        $this->proyekJawabanService = $proyekJawabanService;
    }

    public function store(Request $request, string $proyekId)
    {
        return $this->proyekJawabanService->store($request, $proyekId);
    }

    public function update(Request $request, string $proyekId, string $id)
    {
        return $this->proyekJawabanService->update($request, $id);
    }

    public function storeJadwal(Request $request, string $proyekId)
    {
        return $this->proyekJawabanService->storeJadwal($request);
    }

    public function updateJadwal(Request $request, string $proyekId, string $id)
    {
        return $this->proyekJawabanService->updateJadwal($request, $id);
    }
}
