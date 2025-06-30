<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;
    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via(): array
    {
        return ['mail'];
    }


    public function toMail(object $notifiable): MailMessage
    {
        $url = 'http://localhost:3000/resetpassword?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset your password')
            ->line('Click the button below to reset your password.')
            ->action('Reset Password', $url)
            ->line('If you didn’t request a password reset, no further action is required.');
    }


    public function toArray(): array
    {
        return [];
    }
}
