<?php

use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\Calendar;

class CalendarTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('calendar')->delete();
        //$faker = Faker::create('en_US');

        $date = new DateTime("2015-01-01");
        $days = 365 * 4 + 1;

        for ($i = 0; $i < $days; $i++) {
            Calendar::create([
                'date' => $date->format('Y-m-d')
            ]);
            $date->modify('+1 days');
        }
    }
}
