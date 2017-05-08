<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Nuts\Calendar\Models\Item::class, 5000)->create();
    }
}
