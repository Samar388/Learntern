<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmailVerificationMiddleware
{

    public function handle(Request $request, Closure $next): JsonResponse
    {
        if (Auth::check() && !$request->user()->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Please verify your email address to access this resource.',
            ], 403);
        }
        return $next($request);
    }
}
