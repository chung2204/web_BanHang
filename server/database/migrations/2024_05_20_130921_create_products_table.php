<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('products_id');
            $table->string('name');
            $table->text('description');
            $table->integer('prices');
            $table->string('image');
            $table->string('quantity');
            $table->unsignedBigInteger('brands_id');
            $table->unsignedBigInteger('product_categories_id');
            $table->foreign('product_categories_id')->references('product_categories_id')->on('product_categories')->onUpdate('cascade');
            $table->foreign('brands_id')->references('brands_id')->on('brands')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};