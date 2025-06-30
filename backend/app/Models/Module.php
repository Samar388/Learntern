<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Module extends Model
{
    protected $fillable = [
        'title',
        'isDiscussion',
        'discussion',
        'resource',
        'completed',
        'created_by'
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Pivot tables

    public function interns(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'module_interns',  'module_id', 'intern_id',)->withTimestamps();
    }

    public function mentors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'module_mentors', 'module_id', 'mentor_id',)->withTimestamps();
    }

    //

    public function task(): HasMany
    {
        return $this->hasMany(Task::class, 'module_id');
    }

    public function discussion(): HasOne
    {
        return $this->hasOne(Discussion::class, 'module_id');
    }
}
