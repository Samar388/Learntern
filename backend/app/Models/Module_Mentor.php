<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module_Mentor extends Model
{
    
    protected $fillable = [
        'module_id',
        'mentor_id'
    ];
}
