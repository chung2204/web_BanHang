<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedBack extends Model
{
   
    protected $table = 'feed_backs';
    protected $fillable=[
        'name',
        'email',
        'phone',
        'feedback'
    ];
   
}