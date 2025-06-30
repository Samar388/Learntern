<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TaskSubmission extends Model
{
    protected $fillable = [
        'task_id',
        'user_id',
        'description',
        'file_path',
        'link',
        'status',
        'submitted_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function submissionFeedback(): HasOne
    {
        return $this->hasOne(SubmissionFeedback::class, 'task_submission_id');
    }
}
