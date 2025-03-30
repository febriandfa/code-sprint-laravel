<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            KelasSeeder::class,
            MapelSeeder::class,
            UserSeeder::class,
            MateriSeeder::class,
            KuisSeeder::class,
            ProyekSeeder::class,
            KelompokSeeder::class,
            ProyekJawabanSeeder::class,
            ProyekJadwalSeeder::class,
        ]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
