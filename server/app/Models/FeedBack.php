<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedBack extends Model
{
   
    protected $table = 'feed_backs';
    protected $fillable=[
        'title',
        'feedback', 
        'users_id',  
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}