<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => true,
                'data'    => null,
                'message' => "Unauthorized",
            ], 401);
        }

        if (!in_array(Auth::user()->role, $roles)) {
            return response()->json([
                'success' => true,
                'data'    => null,
                'message' => "Forbidden. You donot have access",
            ], 403);
        }

        return $next($request);
    }
}
