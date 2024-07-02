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
        Schema::create('shop_order_details', function (Blueprint $table) {
            $table->id('shop_order_details_id');
            $table->string('name_product');
            $table->string('image');
            $table->integer('prices');
            $table->integer('total_product');
            $table->unsignedBigInteger('shop_orders_id');
            $table->unsignedBigInteger('products_id');
            $table->foreign('shop_orders_id')->references('shop_orders_id')->on('shop_orders')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_order_details');
    }
};