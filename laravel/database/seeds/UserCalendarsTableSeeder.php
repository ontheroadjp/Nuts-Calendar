<?php

use Illuminate\Database\Seeder;

class UserCalendarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Nuts\Calendar\Models\UserCalendar::class, 3)->create();
    }
}
