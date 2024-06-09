<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCardItem extends Model
{
    protected $primaryKey = 'shopping_card_items_id';
    protected $table = 'shopping_card_items';
    protected $fillable=[
        'name_product',
        'prices', 
        'image', 
        'total_product',  
        'total',  
        'shopping_cards_id',  
        'products_id',  
    ];
    public function shoppingCard()
    {
        return $this->belongsTo(ShoppingCard::class, 'shopping_cards_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id');
    }
}