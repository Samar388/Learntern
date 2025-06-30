<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionFeedback extends Model
{
    protected $fillable = [
        'task_submission_id',
        'mentor_id',
        'comment',
        'score',
        'status',
        'created_at',
    ];

    protected $hidden = [
        'mentor_id',
    ];


    public function taskSubmission(): BelongsTo
    {
        return $this->belongsTo(TaskSubmission::class, 'task_submission_id');
    }

    public function mentor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }
}
