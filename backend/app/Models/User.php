<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'role',
        'avatar',
        'password',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function createdModules(): HasMany
    {
        return $this->hasMany(Module::class, 'created_by');
    }

    // Pivot tables

    public function internModules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class, 'module_interns', 'intern_id', 'module_id')->withTimestamps();
    }

    public function mentorModules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class, 'module_mentors', 'mentor_id', 'module_id')->withTimeStamps();
    }

    //

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function task(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function taskSubmissions(): HasMany
    {
        return $this->hasMany(TaskSubmission::class, 'user_id');
    }

    public function submissionFeedback(): HasMany
    {
        return $this->hasMany(SubmissionFeedback::class, 'mentor_id');
    }

    public function discussionMessage(): HasMany
    {
        return $this->hasMany(DiscussionMessage::class, 'user_id');
    }
}
