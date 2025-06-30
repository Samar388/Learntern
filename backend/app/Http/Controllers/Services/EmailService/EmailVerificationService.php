<?php

namespace App\Http\Controllers\Services\EmailService;

use App\Models\User;

// Service to handle email verification.

class EmailVerificationService
{

    public function verify(int $id, string $hash): array
    {
        $user = User::find($id);

        if (!$user) {
            return ['status' => false, 'error' => 'User not found', 'code' => 404];
        }

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return ['status' => false, 'error' => 'Invalid verification link', 'code' => 403];
        }

        if ($user->hasVerifiedEmail()) {
            return ['status' => true, 'already_verified' => true];
        }

        $user->markEmailAsVerified();

        return ['status' => true, 'already_verified' => false];
    }

    public function resend(User $user): array
    {
        if ($user->hasVerifiedEmail()) {
            return ['status' => false, 'error' => 'Email already verified.', 'code' => 400];
        }

        $user->sendEmailVerificationNotification();

        return ['status' => true];
    }
}
