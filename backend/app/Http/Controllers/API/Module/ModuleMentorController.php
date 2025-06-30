<?php

namespace App\Http\Controllers\API\Module;

use App\Http\Controllers\BaseController;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ModuleMentorController extends BaseController
{
    public function assignMentor(Request $request, Module $module): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'mentor_email' => 'required|email|exists:users,email',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors(), 422);
            }

            $mentor = User::where('email', $request->mentor_email)
                ->where('role', 'Mentor')
                ->first();

            if (!$mentor) {
                return $this->sendError("Mentor not found or invalid role", 404);
            }

            $module->mentors()->attach($mentor->id);

            return $this->sendResponse(null, 'Mentor assigned successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Mentor assignment failed.', $e->getMessage(), 500);
        }
    }

    public function enrolledModules(): JsonResponse
    {
        try {
            $user = Auth::user();

            $modules = $user->mentorModules->map(function ($module) use ($user) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'mentor' => [
                        'full_name' => $user->full_name,
                    ],
                ];
            });

            return $this->sendResponse(
                $modules,
                'Mentor enrolled modules fetched successfully.'
            );
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch mentor enrolled modules.', $e->getMessage(), 500);
        }
    }
}
