<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDeadlineReminder extends Notification
{
    use Queueable;

    protected $task;

    public function __construct($task)
    {
        $this->task = $task;
    }

    public function via(): array
    {
        return ['mail'];
    }

    public function toMail()
    {
        return (new MailMessage)
            ->subject('Task Deadline Reminder')
            ->line("Reminder: The task '{$this->task->title}' is due tomorrow on {$this->task->deadline->format('Y-m-d')}.")
            ->line('Please complete it by the deadline.')
            ->action('View Task', url('/tasks/' . $this->task->id))
            ->line('Thank you for your attention!');
    }
}
