<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AlreadyJoinedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs('siswa.proyek.index')) {
            return $next($request);
        }

        $proyekId = $request->route('proyekId') ?? $request->route('proyek');
        $userId = Auth::user()->id;

        $hasJoinedGroup = DB::table('kelompok_anggotas')
            ->join('kelompoks', 'kelompok_anggotas.kelompok_id', '=', 'kelompoks.id')
            ->where('kelompoks.proyek_id', $proyekId)
            ->where('kelompok_anggotas.anggota_id', $userId)
            ->exists();

        if (!$hasJoinedGroup) {
            return to_route('siswa.proyek.kelompok', $proyekId)->with('warning', 'Silakan bergabung kedalam kelompok terlebih dahulu!');
        }

        return $next($request);
    }
}
