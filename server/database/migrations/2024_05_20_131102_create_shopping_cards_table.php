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
        Schema::create('shopping_cards', function (Blueprint $table) {
            $table->id('shopping_cards_id');
            $table->integer('total_product');
            $table->integer('total_prices');
            $table->unsignedBigInteger('users_id');
            $table->foreign('users_id')->references('users_id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_cards');
    }
};