<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    public function show(): JsonResponse
    {
        try {
            $user = Auth::user();

            $user->load(['internModules.mentors']);

            $data = [
                'full_name' => $user->full_name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar' => $user->avatar,
                'intern_modules' => $user->internModules->map(function ($module) {
                    $mentor = $module->mentors->first();
                    return [
                        'id' => $module->id,
                        'title' => $module->title,
                        'mentor' => $mentor ? [
                            'full_name' => $mentor->full_name,
                        ] : null,
                    ];
                }),
            ];

            return $this->sendResponse($data, 'User data fetched successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch user data.', $e->getMessage(), 500);
        }
    }
}
