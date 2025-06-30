<?php

namespace App\Http\Controllers\API\Task;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\TaskService\TaskService;
use App\Http\Requests\TaskRequest;
use App\Models\Module;
use Illuminate\Http\JsonResponse;
use Exception;

class TaskController extends BaseController
{
    public function __construct(protected TaskService $taskService) {}

    public function create(TaskRequest $request, Module $module): JsonResponse
    {
        try {
            $task = $this->taskService->createTask($request->validated(), $module);
            return $this->sendResponse($task, 'Task created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Task creation failed.', $e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function index(int $id): JsonResponse
    {
        try {
            $tasks = $this->taskService->getTasksByModule($id);
            return $this->sendResponse($tasks, 'Tasks retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve tasks.', $e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function show(int $taskID): JsonResponse
    {
        try {
            $task = $this->taskService->getTaskById($taskID);
            return $this->sendResponse($task, 'Task retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve task.', $e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function delete(int $id): JsonResponse
    {
        try {
            $this->taskService->deleteTask($id);
            return $this->sendResponse(null, 'Task deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to delete task.', $e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
