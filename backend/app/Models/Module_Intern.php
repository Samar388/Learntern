<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module_Intern extends Model
{
    
    protected $fillable = [
        'intern',
        'mentor_id'
    ];
}
