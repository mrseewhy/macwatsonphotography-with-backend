<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drones extends Model
{
    //
    protected $fillable = [
        'title',
        'description',
        'type',
        'link',
        'file',
        'path',
    ];
}
