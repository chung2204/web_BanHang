<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCardItem extends Model
{
    protected $table = 'shopping_card_items';
    protected $fillable=[
        'name_product',
        'prices', 
        'total',  
        'shopping_cards_id',  
        'products_id',  
    ];
    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function shoppingCard(){
        return $this->belongsTo(ShoppingCard::class);
    }
}