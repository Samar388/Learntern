<?php

namespace App\Http\Controllers\Services\TaskService;

use App\Models\TaskSubmission;
use App\Models\SubmissionFeedback;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Exception;

class SubmissionFeedbackService
{
    public function submitFeedback(array $data, int $submissionId): SubmissionFeedback
    {
        try {
            $submission = TaskSubmission::findOrFail($submissionId);

            return SubmissionFeedback::create([
                'task_submission_id' => $submission->id,
                'mentor_id'          => Auth::id(),
                'comment'            => $data['comment'],
                'score'              => $data['score'],
                'status'             => $data['status'],
                'created_at'         => now(),
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getFeedbacksBySubmission(int $submissionId): Collection
    {
        try {
            return SubmissionFeedback::with('mentor:id,id,full_name')
                ->where('task_submission_id', $submissionId)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getUserSubmissionWithFeedback(int $taskId): array
    {
        try {
            $userId = Auth::id();

            $submission = TaskSubmission::where('task_id', $taskId)
                ->where('user_id', $userId)
                ->first();

            if (!$submission) {
                return [];
            }

            $feedback = SubmissionFeedback::with('mentor:id,id,full_name')
                ->where('task_submission_id', $submission->id)
                ->first();

            return [
                'submission' => $submission,
                'feedback'   => $feedback,
            ];
        } catch (Exception $e) {
            throw $e;
        }
    }
}
