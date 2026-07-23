<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class NextSyntaxMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userId = Auth::user()->id;
        $proyekId = $request->route('proyekId');
        $syntaxNumber = $this->getSyntaxNumberFromRoute($request);

        $kelompok = DB::table('kelompok_anggotas')
            ->join('kelompoks', 'kelompok_anggotas.kelompok_id', '=', 'kelompoks.id')
            ->where('kelompok_anggotas.anggota_id', $userId)
            ->where('kelompoks.proyek_id', $proyekId)
            ->select('kelompoks.id as kelompok_id')
            ->first();

        if (!$kelompok) {
            return redirect()->route('siswa.proyek.index')->with('error', 'Anda tidak terdaftar dalam kelompok untuk proyek ini');
        }

        $proyek = DB::table('proyeks')->where('id', $proyekId)->first();

        if ($proyek->status === 'selesai') {
            return $next($request);
        }

        $jawaban = DB::table('proyek_jawabans')
            ->where('proyek_id', $proyekId)
            ->where('kelompok_id', $kelompok->kelompok_id)
            ->first();

        if (!$jawaban && $syntaxNumber > 1) {
            return redirect()->route('siswa.proyek.syntaxOne', $proyekId)
                ->with('warning', 'Selesaikan tahap sebelumnya terlebih dahulu!');
        }

        if ($syntaxNumber > 1) {
            $canProceed = $this->canProceedToSyntax($jawaban, $syntaxNumber);

            if (!$canProceed) {
                $redirectRoute = $this->getRedirectRoute($syntaxNumber);
                return redirect()->route($redirectRoute, $proyekId)
                    ->with('warning', 'Selesaikan tahap sebelumnya terlebih dahulu!');
            }
        }

        return $next($request);
    }

    private function getSyntaxNumberFromRoute(Request $request): int
    {
        $routeName = $request->route()->getName();

        return match($routeName) {
            'siswa.proyek.syntaxOne' => 1,
            'siswa.proyek.syntaxTwo' => 2,
            'siswa.proyek.syntaxThree' => 3,
            'siswa.proyek.syntaxFour' => 4,
            'siswa.proyek.syntaxFive' => 5,
            'siswa.proyek.syntaxSix' => 6,
            default => 1
        };
    }

    private function canProceedToSyntax($jawaban, int $syntaxNumber): bool
    {
        return match($syntaxNumber) {
            2 => $jawaban->status_tahap_4 === 'diterima',
            3 => $jawaban->status_tahap_5 === 'diterima',
            4 => $jawaban->status_tahap_6 === 'diterima',
            5 => $jawaban->status_tahap_7 === 'diterima',
            6 => $jawaban->status_tahap_8 === 'diterima',
            default => true
        };
    }

    private function getRedirectRoute(int $syntaxNumber): string
    {
        return match($syntaxNumber) {
            2 => 'siswa.proyek.syntaxOne',
            3 => 'siswa.proyek.syntaxTwo',
            4 => 'siswa.proyek.syntaxThree',
            5 => 'siswa.proyek.syntaxFour',
            6 => 'siswa.proyek.syntaxFive',
            default => 'siswa.proyek.syntaxOne'
        };
    }
}
