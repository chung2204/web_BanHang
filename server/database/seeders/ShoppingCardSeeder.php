<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ShoppingCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shopping_cards')->insert([
            [
                'total_product'=> '0',
                'total_prices'=> '0',
                'users_id'=> '1',
            ],
        ]);
    }
}