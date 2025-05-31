<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'alka',
            'email' => 'alka@gmail.com',
            'password' => 'alka123',
            'image' => 'alka.jpg',
            'role' => 'user'
        ]);
    }
}
