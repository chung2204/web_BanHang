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
        Schema::create('shop_orders', function (Blueprint $table) {
            $table->id('shop_orders_id');
            $table->date('date_order');
            $table->string('status_order',100);
            $table->integer('total_prices');
            $table->string('full_name',100);
            $table->string('email',100);
            $table->string('address');
            $table->string('phone',11);
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('shopping_cards_id');
            $table->foreign('shopping_cards_id')->references('shopping_cards_id')->on('shopping_cards')->onUpdate('cascade');
            $table->foreign('users_id')->references('users_id')->on('users')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_orders');
    }
};