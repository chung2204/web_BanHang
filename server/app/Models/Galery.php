<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galery extends Model
{
    protected $primaryKey = 'galeries_id';
    protected $table = 'galeries';
    protected $fillable=[
        'thumbnail',
        'description', 
        'products_id',  
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'products_id');
    }
}