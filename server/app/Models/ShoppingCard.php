<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCard extends Model
{
    protected $table = 'shopping_cards';
    protected $fillable=[
        'total_prices',
        'users_id', 
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function shopOrders(){
        return $this->hasMany(ShopOrders::class);
    }
    public function shoppingCardItem(){
        return $this->hasMany(ShoppingCardItem::class);
    }
   
}