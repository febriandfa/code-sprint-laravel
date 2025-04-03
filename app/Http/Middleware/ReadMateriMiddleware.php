<?php

namespace App\Http\Middleware;

use App\Repositories\MateriRepository;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReadMateriMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    protected $materiRepository;

    public function __construct(MateriRepository $materiRepository)
    {
        $this->materiRepository = $materiRepository;
    }

    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs('siswa.materi.index')) {
            return $next($request);
        }

        $materiId = $request->route('materiId') ?? $request->route('materi');

        $isRead = $this->materiRepository->checkIsRead($materiId);

        if (!$isRead) {
            $this->materiRepository->read($materiId);

            return $next($request);
        }

        return $next($request);
    }
}
