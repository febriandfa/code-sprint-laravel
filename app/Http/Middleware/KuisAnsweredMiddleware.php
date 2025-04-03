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

        if ($existingResult) {
            return redirect()->route('siswa.kuis.index')->with('warning', 'Kuis sudah dikerjakan');
        }

        return $next($request);
    }
}
