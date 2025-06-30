<?php

namespace App\Http\Controllers\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cookie;

class TokenService
{
    public function createAccessToken(User $user): string
    {
        return $user->createToken('auth_token')->accessToken;
    }

    public function createAccessTokenCookie(string $token): \Symfony\Component\HttpFoundation\Cookie
    {
        return cookie(
            'access_token',
            $token,
            60 * 24,
            '/',
            'localhost',
            false,
            false,
            false,
            'None'
        );
    }

    public function forgetAccessTokenCookie()
    {
        return Cookie::forget('access_token');
    }
}
