<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopOrders extends Model
{
    protected $primaryKey = 'shop_orders_id';
    protected $table = 'shop_orders';
    protected $fillable=[
        'date_order',
        'full_name',  
        'email',  
        'phone', 
        'address',   
        'total_prices',  
        'total_product',  
        'status_order', 
        'users_id',   
    ];
    public function user(){
        return $this->belongsTo(User::class,'users_id');
    }
    public function orderdetails(){
        return $this->hasMany(ShopOrderDetails::class,'shop_orders_id');
    }
}