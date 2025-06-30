<?php

namespace App\Http\Controllers\API\Module;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\ModuleService as ServicesModuleService;
use App\Http\Requests\CreateModuleRequest;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleController extends BaseController
{
    public function __construct(protected ServicesModuleService $moduleService) {}

    public function store(CreateModuleRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();

            $mentor = null;

            if (!empty($validated['mentor_email'])) {
                $mentor = User::where('email', $validated['mentor_email'])
                    ->where('role', 'Mentor')
                    ->first();

                if (!$mentor) {
                    return $this->sendError('Mentor not found.', [], 404);
                }
            }

            $module = $this->moduleService->createModule($validated, $mentor);

            return $this->sendResponse($module, 'Module created successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Module creation failed.', $e->getMessage(), 500);
        }
    }

    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $module = Module::find($id);

            if (!$module) {
                return $this->sendError('Module not found.', [], 404);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
            ]);

            $updatedModule = $this->moduleService->updateModule($module, $validated);

            return $this->sendResponse($updatedModule, 'Module updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Module update failed.', $e->getMessage(), 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $module = Module::find($id);

            if (!$module) {
                return $this->sendError('Module not found.', [], 404);
            }

            $this->moduleService->deleteModule($module);

            return $this->sendResponse(null, 'Module deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Module deletion failed.', $e->getMessage(), 500);
        }
    }

    public function index(): JsonResponse
    {
        try {
            $modules = $this->moduleService->getAllModules();

            return $this->sendResponse($modules, 'All modules fetched successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch modules.', $e->getMessage(), 500);
        }
    }
}
