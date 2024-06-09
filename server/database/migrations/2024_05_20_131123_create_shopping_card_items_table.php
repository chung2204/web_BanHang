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
        Schema::create('shopping_card_items', function (Blueprint $table) {
            $table->id('shopping_card_items_id');
            $table->string('name_product');
            $table->integer('prices');
            $table->string('image');
            $table->integer('total_product');
            $table->integer('total');
            $table->unsignedBigInteger('shopping_cards_id');
            $table->unsignedBigInteger('products_id');
            $table->foreign('shopping_cards_id')->references('shopping_cards_id')->on('shopping_cards')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('products_id')->references('products_id')->on('products')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_card_items');
    }
};