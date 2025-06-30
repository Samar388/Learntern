<?php

namespace App\Http\Controllers\Services\TaskService;

use App\Models\Module;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Collection;

class TaskService
{
    public function createTask(array $data, Module $module): Task
    {
        try {
            return Task::create([
                'title'       => $data['title'],
                'description' => $data['description'] ?? null,
                'issued_date' => $data['issued_date'],
                'deadline'    => $data['deadline'],
                'module_id'   => $module->id,
                'created_by'  => Auth::id(),
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getTasksByModule(int $moduleId): Collection
    {
        try {
            $userId = Auth::id();

            return Task::where('module_id', $moduleId)
                ->with(['module:id,title', 'module.discussion:id,module_id'])
                ->get()
                ->map(function ($task) use ($userId) {
                    $isSubmitted = $task->taskSubmission()
                        ->where('user_id', $userId)
                        ->exists();

                    return [
                        'id'            => $task->id,
                        'title'         => $task->title,
                        'description'   => $task->description,
                        'issued_date'   => $task->issued_date,
                        'deadline'      => $task->deadline,
                        'module_title'  => optional($task->module)->title,
                        'discussion_id' => optional(optional($task->module)->discussion)->id,
                        'is_submitted'  => $isSubmitted,
                    ];
                });
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getTaskById(int $taskID): Task
    {
        try {
            return Task::select('id', 'title', 'description', 'issued_date', 'deadline')->findOrFail($taskID);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function deleteTask(int $taskId): bool
    {
        try {
            $task = Task::findOrFail($taskId);
            return $task->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
