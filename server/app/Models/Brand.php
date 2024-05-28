<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $primaryKey = 'brands_id';
    protected $table = 'brands';
    protected $fillable=[
        'name',
        'address',   
    ];
    public function products()
    {
        return $this->hasMany(Product::class, 'brands_id');
    }
}