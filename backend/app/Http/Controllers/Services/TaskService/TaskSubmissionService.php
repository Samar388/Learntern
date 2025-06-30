<?php

namespace App\Http\Controllers\Services\TaskService;

use App\Http\Controllers\Services\FileService\FileUploadService;
use App\Models\Task;
use App\Models\TaskSubmission;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Exception;

class TaskSubmissionService
{
    public function __construct(protected FileUploadService $uploader) {}

    public function submitTask(array $data, int $taskId, ?UploadedFile $file = null): TaskSubmission
    {
        try {
            $fileUrl = $file ? $this->uploader->uploadToS3($file, 'submissions') : null;

            $task = Task::findOrFail($taskId);
            $now = now();

            $status = ($task->deadline && $now->greaterThan($task->deadline)) ? 'delayed' : 'submitted';

            return TaskSubmission::create([
                'task_id'      => $taskId,
                'user_id'      => Auth::id(),
                'description'  => $data['description'] ?? null,
                'file_path'    => $fileUrl,
                'link'         => $data['link'] ?? null,
                'status'       => $status,
                'submitted_at' => $now,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getSubmissionsByTaskId(int $taskId): Collection
    {
        try {
            return TaskSubmission::with(['submissionFeedback', 'user'])
                ->where('task_id', $taskId)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
