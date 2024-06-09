<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopOrderDetails extends Model
{
    protected $primaryKey = 'shop_order_details_id ';
    protected $table = 'shop_order_details';
    protected $fillable=[
        'name_product',
        'image',  
        'prices',  
        'total_product', 
        'shop_orders_id ',     
    ];
    public function order(){
        return $this->belongsTo(User::class,'shop_orders_id');
    }
}