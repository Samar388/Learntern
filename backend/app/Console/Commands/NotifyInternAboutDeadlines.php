<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Notifications\TaskDeadlineReminder;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Notifications\Notification;

class NotifyInternAboutDeadlines extends Command
{

    protected $signature = 'tasks:notify-intern-about-deadlines';
    protected $description = 'Send reminders to interns about tasks that are due tomorrow';

    public function handle()
    {
        $tomorrow = Carbon::tomorrow()->startOfDay();
        $tasks = Task::whereDate('deadline', $tomorrow)->get();

        foreach ($tasks as $task) {
            $interns = $task->module->interns;

            foreach ($interns as $intern) {
                $intern->notify(new TaskDeadlineReminder($task));
            }
        }

        $this->info('Deadline email notifications sent successfully.');
    }
}
