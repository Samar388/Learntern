<?php

namespace App\Http\Controllers\Services;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

// Service class to handle reset password logic.

class PasswordResetService
{

    public function __construct(protected PasswordBroker $broker)
    {
        $this->broker = Password::broker();
    }

    public function sendResetLink(string $email): string
    {
        return $this->broker->sendResetLink(['email' => $email]);
    }

    public function resetPassword(array $credentials): string
    {
        return $this->broker->reset($credentials, function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();

            event(new PasswordReset($user));
        });
    }
}
