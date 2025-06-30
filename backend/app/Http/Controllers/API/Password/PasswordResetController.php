<?php

namespace App\Http\Controllers\API\Password;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Services\PasswordResetService;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends BaseController
{

    public function __construct(protected PasswordResetService $passwordService) {}

    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $email = $request->validated();

            $status = $this->passwordService->sendResetLink($email);

            return $status === Password::RESET_LINK_SENT
                ? $this->sendResponse(null, 'Password reset link sent to your email.')
                : $this->sendError('Unable to send reset link.', [], 422);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while sending the reset link.', ['error' => $e->getMessage()], 500);
        }
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $status = $this->passwordService->resetPassword(
                $request->only('email', 'password', 'password_confirmation', 'token')
            );

            return $status === Password::PASSWORD_RESET
                ? $this->sendResponse(null, 'Password has been reset successfully.')
                : $this->sendError('Unable to reset password.', [], 422);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while resetting the password.', ['error' => $e->getMessage()], 500);
        }
    }
}
