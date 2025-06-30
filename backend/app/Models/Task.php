<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{

    protected $fillable = [
        'module_id',
        'title',
        'description',
        'issued_date',
        'deadline',
        'created_by',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function taskSubmission(): HasMany
    {
        return $this->hasMany(TaskSubmission::class, 'task_id');
    }
}
