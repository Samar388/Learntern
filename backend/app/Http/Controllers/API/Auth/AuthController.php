<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\AuthService as ServicesAuthService;
use App\Http\Controllers\Services\TokenService;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    public function __construct(protected ServicesAuthService $authService, protected TokenService $tokenService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $avatar = $request->file('avatar');

            $result = $this->authService->register($data, $avatar);

            return $this->sendResponse($result, 'Registration successful.');
        } catch (\Exception $e) {
            return $this->sendError(
                'Registration failed.',
                ['error' => $e->getMessage()],
                $e->getCode() ?: 500
            );
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            $result = $this->authService->login($data['email'], $data['password']);

            $cookie = $this->tokenService->createAccessTokenCookie($result['token']);

            return $this->sendResponse($result, 'Login successful.')->withCookie($cookie);
        } catch (\Exception $e) {
            return $this->sendError(
                'Login failed.',
                ['error' => $e->getMessage()],
                $e->getCode() ?: 500
            );
        }
    }

    public function logout(): JsonResponse
    {
        try {
            $user = Auth::user();

            if ($user) {
                $this->authService->logout($user);
            }

            $cookie = $this->tokenService->forgetAccessTokenCookie();

            return $this->sendResponse(null, 'Logout successful.')->withCookie($cookie);
        } catch (\Exception $e) {
            return $this->sendError('Logout failed.', ['error' => $e->getMessage()], 500);
        }
    }

    public function validateToken(): JsonResponse
    {
        try {
            $user = Auth::user();

            if ($user) {
                $result = [
                    'valid' => true,
                    'user' => [
                        'id' => $user->id,
                        'role' => $user->role,
                    ],
                ];
                return $this->sendResponse($result, 'Token is valid.');
            }

            return $this->sendError('Invalid token.', ['valid' => false], 401);
        } catch (\Exception $e) {
            return $this->sendError('Token validation failed.', ['error' => $e->getMessage()], 500);
        }
    }
}
