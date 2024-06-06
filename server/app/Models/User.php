<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Notifications\Notifiable;
class User extends Model implements AuthenticatableContract
{
    use HasFactory, Notifiable, Authenticatable;
    protected $primaryKey = 'users_id';
    protected $table = 'users';
    protected $fillable=[
        'name',
        'birthday', 
        'email',  
        'phone',  
        'username',  
        'password',  
    ];
   
    public function shopOrders(){
        return $this->hasMany(ShopOrders::class);
    }
    public function shoppingCard()
    {
        return $this->hasOne(ShoppingCard::class, 'users_id');
    }
}