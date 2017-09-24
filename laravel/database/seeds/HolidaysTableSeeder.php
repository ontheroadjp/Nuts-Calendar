<?php

use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\Holiday;
use Nuts\Calendar\Libs\GoogleCalendar;

class HolidaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('holidays')->delete();

        $apiKey = env('GOOGLE_API_KEY', '');

        $google = new GoogleCalendar( $apiKey);

        $startDate = '2010-01-01T00%3A00%3A00.000Z';
        $endDate = '2020-12-31T00%3A00%3A00.000Z';
        $holidaysId = 'japanese__ja@holiday.calendar.google.com';
        $maxResults = 100;

        //$jp = 'ja.japanese#holiday@group.v.calendar.google.com';
        //$usa = 'ja.usa#holiday@group.v.calendar.google.com'; // usa

        $results = $google->fetch( $startDate, $endDate, $holidaysId, $maxResults);

        foreach( $results as $key => $val ) {

            $year = explode('-', $key)[0];

            Holiday::create([
                'region' => 'jp',
                'year' => $year,
                'date' => $key,
                'holiday_name' => $val
            ]);
        }
    }
}
