<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopOrders extends Model
{
    protected $table = 'shop_orders';
    protected $fillable=[
        'date_order',
        'status_order', 
        'total_prices',  
        'full_name',  
        'email',  
        'address',  
        'phone',  
        'users_id',  
        'shopping_cards_id',    
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function shoppingCard(){
        return $this->belongsTo(ShoppingCard::class);
    }
}