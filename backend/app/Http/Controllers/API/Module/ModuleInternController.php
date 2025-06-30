<?php

namespace App\Http\Controllers\API\Module;

use App\Http\Controllers\BaseController;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ModuleInternController extends BaseController
{
    public function assignIntern(Request $request, Module $module): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'emails' => 'required|array',
                'emails.*' => 'required|email|exists:users,email',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation failed.', $validator->errors(), 422);
            }

            $validated = $validator->validated();

            $interns = User::whereIn('email', $validated['emails'])
                ->where('role', 'Intern')
                ->pluck('id')
                ->toArray();

            if (empty($interns)) {
                return $this->sendError('No valid interns found in the provided emails.', null, 404);
            }

            $module->interns()->syncWithoutDetaching($interns);

            return $this->sendResponse([
                'assigned_count' => count($interns)
            ], 'Interns assigned successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Intern assignment failed.', $e->getMessage(), 500);
        }
    }

    public function enrolledModules(): JsonResponse
    {
        try {
            $user = Auth::user();

            $user->load(['internModules.mentors']);

            $modules = $user->internModules->map(function ($module) {
                $mentor = $module->mentors->first();
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'mentor' => $mentor ? [
                        'full_name' => $mentor->full_name,
                    ] : null,
                ];
            });

            return $this->sendResponse(
                $modules,
                'Enrolled modules fetched successfully.'
            );
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch enrolled modules.', $e->getMessage(), 500);
        }
    }
}
