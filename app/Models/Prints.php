<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prints extends Model
{
    //
    protected $fillable = [
        'title',
        'size',
        'range',
        'amount',
        'type',
        'link',
        'file',
        'path',
    ];
}
