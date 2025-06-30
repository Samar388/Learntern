<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Email\EmailVerificationController;
use App\Http\Controllers\API\Module\ModuleController;
use App\Http\Controllers\API\Module\ModuleInternController;
use App\Http\Controllers\API\Module\ModuleMentorController;
use App\Http\Controllers\API\Password\PasswordResetController;
use App\Http\Controllers\API\Task\TaskController;
use App\Http\Controllers\API\Task\TaskSubmissionController;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\Discussion\DiscussionMessageController;
use App\Http\Controllers\API\Task\SubmissionFeedbackController;
use Illuminate\Support\Facades\Route;


// Unprotected API routes
Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [PasswordResetController::class, 'forgot']);
    Route::post('/reset-password', [PasswordResetController::class, 'reset']);
    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware('signed')
        ->name('verification.verify');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::post('/validate-token', [AuthController::class, 'validateToken']);
    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Discussion related API
    Route::prefix('discussions/{discussion}')->group(function () {
        Route::get('/messages', [DiscussionMessageController::class, 'index']);
        Route::post('/messages', [DiscussionMessageController::class, 'store']);
    });

    // Modules related API (Admin)
    Route::middleware('role:Admin')->group(function () {
        Route::prefix('modules')->group(function () {
            Route::post('/create', [ModuleController::class, 'store']);
            Route::delete('/delete/{id}', [ModuleController::class, 'destroy']);
            Route::get('/read', [ModuleController::class, 'index']);
            Route::patch('/update/{id}', [ModuleController::class, 'update']);
            Route::post('/{module}/assign-mentor', [ModuleMentorController::class, 'assignMentor']);
            Route::post('/{module}/assign-intern', [ModuleInternController::class, 'assignIntern']);
        });
    });

    // Mentor related API
    Route::middleware('role:Mentor')->group(function () {
        Route::get('/modules/mentor/enrolled', [ModuleMentorController::class, 'enrolledModules']);
        Route::post('/modules/{module}/task/create', [TaskController::class, 'create']);
        Route::delete('/task/delete/{id}', [TaskController::class, 'delete']);
        Route::post('/task/{id}/feedback', [SubmissionFeedbackController::class, 'submit']);
    });

    // Intern related API
    Route::middleware(['role:Intern'])->group(function () {
        Route::get('/modules/enrolled', [ModuleInternController::class, 'enrolledModules']);
        Route::post('/task/{id}/submit', [TaskSubmissionController::class, 'submit']);
        Route::get('/task/feedback/view/{id}', [SubmissionFeedbackController::class, 'show']);
    });

    // Mentor & Intern API
    Route::middleware(['role:Mentor,Intern'])->group(function () {
        Route::get('/modules/{id}/task/all', [TaskController::class, 'index']);
        Route::get('modules/task/{taskID}', [TaskController::class, 'show']);
        Route::get('/task/submission/{id}', [TaskSubmissionController::class, 'show']);
    });
});
