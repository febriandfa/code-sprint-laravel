<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class KuisAnsweredMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $kuisId = $request->route('kuis');

        $existingResult = DB::table('kuis_nilais')
            ->where('kuis_id', $kuisId)
            ->where('user_id', Auth::user()->id)
            ->first();

        if ($existingResult && $request->routeIs('siswa.kuis.show')) {
            return to_route('siswa.kuis.hasil', $kuisId)->with('warning', 'Anda sudah mengerjakan kuis ini.');
        }

        if (!$existingResult && $request->routeIs('siswa.kuis.hasil')) {
            return to_route('siswa.kuis.index')->with('warning', 'Anda belum mengerjakan kuis ini.');
        }

        return $next($request);
    }
}
