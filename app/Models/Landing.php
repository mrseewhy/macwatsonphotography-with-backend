<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Landing extends Model
{
    //
    protected $fillable = [
        'category',
        'size',
        'type',
        'link',
        'file',
        'path',
    ];
}
