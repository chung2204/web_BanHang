<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'products_id';
    protected $table = 'products';
    protected $fillable=[
        'name',
        'description', 
        'prices',  
        'image',  
        'quantity',  
        'brands_id',  
        'product_categories_id',  
    ];
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_categories_id');
    }
    public function brand(){
        return $this->belongsTo(Brand::class,'brands_id');
    }
    public function productDetails(){
        return $this->hasMany(ProductFetails::class);
    }
    public function shoppingCardItem(){
        return $this->hasMany(ShoppingCardItem::class);
    }
    public function galery(){
        return $this->hasMany(Galery::class);
    }
}