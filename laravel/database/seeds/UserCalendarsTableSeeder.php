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
        factory(App\UserCalendar::class, 5)->create();
    }
}
