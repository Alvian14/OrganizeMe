<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => 'admin123',
                'image' => 'admin.jpg',
                'role' => 'admin'
            ],
            [
                'username' => 'user',
                'email' => 'user@gmail.com',
                'password' => 'user123',
                'image' => 'user.jpg',
                'role' => 'user'
            ],
            [
                'username' => 'alka',
                'email' => 'alka@gmail.com',
                'password' => 'alka123',
                'image' => 'alka.jpg',
                'role' => 'user'
            ],
            [
                'username' => 'bagas',
                'email' => 'bagas@gmail.com',
                'password' => 'bagas123',
                'image' => 'bagas.jpg',
                'role' => 'user'
            ],
            [
                'username' => 'alvian',
                'email' => 'alvian@gmail.com',
                'password' => 'alvian123',
                'image' => 'alvian.jpg',
                'role' => 'user'
            ]
        ];

        foreach ($users as $userData) {
            if (!User::where('email', $userData['email'])->exists()) {
                User::create([
                    'username' => $userData['username'],
                    'email' => $userData['email'],
                    'password' => Hash::make($userData['password']),
                    'image' => $userData['image'],
                    'role' => $userData['role']
                ]);
            }
        }
    }
}
