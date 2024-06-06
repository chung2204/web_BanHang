<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCard extends Model
{
    protected $primaryKey = 'shopping_cards_id';
    protected $table = 'shopping_cards';
    protected $fillable=[
        'total_product',
        'total_prices',
        'users_id', 
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id', 'users_id');
    }
    public function shopOrders(){
        return $this->hasMany(ShopOrders::class);
    }
    public function shoppingCardItem(){
        return $this->hasMany(ShoppingCardItem::class);
    }
   
}