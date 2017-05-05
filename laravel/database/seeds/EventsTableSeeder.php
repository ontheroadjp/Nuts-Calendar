<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Nuts\Calendar\Models\Event::class, 5000)->create();
    }
}
