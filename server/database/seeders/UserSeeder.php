<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'birthday' =>Carbon::createFromFormat('d/m/Y', '22/04/2002')->format('Y-m-d'),
                'email' => 'abcd@gmail.com',
                'phone' => '0379854267',
                'username' => 'Admin',
                'password' => '1',
            ],
            [
                'name' => 'User1',
                'birthday' =>Carbon::createFromFormat('d/m/Y', '22/04/2002')->format('Y-m-d'),
                'email' => 'abcd1@gmail.com',
                'phone' => '0379854268',
                'username' => 'User1',
                'password' => '1',
            ],
            [
                'name' => 'User2',
                'birthday' =>Carbon::createFromFormat('d/m/Y', '22/04/2002')->format('Y-m-d'),
                'email' => 'abcd2@gmail.com',
                'phone' => '0379854269',
                'username' => 'User2',
                'password' => '1',
            ],
        ]);
    }
}