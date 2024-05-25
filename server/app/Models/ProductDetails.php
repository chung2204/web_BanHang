<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetails extends Model
{
    protected $primaryKey = 'product_details_id';
    protected $table = 'product_details';
    protected $fillable=[
        'name',
        'description', 
        'products_id',   
    ];
    public function product(){
        return $this->belongsTo(Product::class);
    }
}