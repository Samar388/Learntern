<?php

namespace App\Http\Controllers\API\Task;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\TaskService\TaskSubmissionService;
use App\Http\Requests\TaskSubmissionRequest;
use Illuminate\Http\JsonResponse;
use Exception;

class TaskSubmissionController extends BaseController
{
    public function __construct(protected TaskSubmissionService $taskSubmissionService) {}

    public function submit(TaskSubmissionRequest $request, int $id): JsonResponse
    {
        try {
            $submission = $this->taskSubmissionService->submitTask(
                $request->validated(),
                $id,
                $request->file('file')
            );

            return $this->sendResponse($submission, 'Task submitted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Task submission failed.', ['error' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $submissions = $this->taskSubmissionService->getSubmissionsByTaskId($id);

            if ($submissions->isEmpty()) {
                return $this->sendError('Task submissions not found.', [], 404);
            }

            return $this->sendResponse($submissions, 'Task submissions retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Task submission failed.', ['error' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}
