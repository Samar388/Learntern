<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Discussion extends Model
{

    protected $fillable = [
        "module_id"
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(DiscussionMessage::class, 'discussion_id');
    }
}
