<?php

namespace App\Http\Controllers\API\Task;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\TaskService\SubmissionFeedbackService;
use App\Http\Requests\SubmissionFeedbackRequest;
use Illuminate\Http\JsonResponse;
use Exception;

class SubmissionFeedbackController extends BaseController
{
    public function __construct(protected SubmissionFeedbackService $feedbackService) {}

    public function submit(SubmissionFeedbackRequest $request, int $id): JsonResponse
    {
        try {
            $feedback = $this->feedbackService->submitFeedback($request->validated(), $id);
            return $this->sendResponse($feedback, 'Feedback submitted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to submit feedback.', [$e->getMessage()], $e->getCode() ?: 500);
        }
    }

    public function index(int $id): JsonResponse
    {
        try {
            $feedback = $this->feedbackService->getFeedbacksBySubmission($id);

            if ($feedback->isEmpty()) {
                return $this->sendError('No feedback found for this submission.', [], 404);
            }

            return $this->sendResponse($feedback, 'Feedback retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve feedback.', [$e->getMessage()], $e->getCode() ?: 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $data = $this->feedbackService->getUserSubmissionWithFeedback($id);

            if (empty($data)) {
                return $this->sendError('Task submission not found.', [], 404);
            }

            return $this->sendResponse($data, 'Task submission and feedback retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Task submission failed.', ['error' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}
