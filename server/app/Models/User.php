<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable=[
        'name',
        'birthday', 
        'email',  
        'phone',  
        'username',  
        'password',  
    ];
    public function feedBack(){
        return $this->hasMany(FeedBack::class);
    }
    public function shoppingCard(){
        return $this->hasMany(ShoppingCard::class);
    }
    public function shopOrders(){
        return $this->hasMany(ShopOrders::class);
    }
}