<?php

use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\Calendar;
use Nuts\Calendar\Libs\ChineseCalendar as ChineseCalendar;

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

//        $startYear = 2017;
//        $startMonth = 1;
//        $startDay = 1;

        $date = new DateTime("2015-01-01");
        $days = 365 * 4 + 1;

        $chineseCalendar = new ChineseCalendar();

        for ($i = 0; $i < $days; $i++) {

            $y = $date->format('Y');
            $m = $date->format('m');
            $d = $date->format('d');

            $result = $chineseCalendar->solar($y, $m, $d);

//            Calendar::create([
//                'date' => $date->format('Y-m-d')
//            ]);

            Calendar::create([
                'date' => $date->format('Y-m-d'),
                'lunar_year' => $result['lunar_year'],
                'lunar_month' => $result['lunar_month'],
                'lunar_day' => $result['lunar_day'],
                'lunar_month_chinese' => $result['lunar_month_chinese'],
                'lunar_day_chinese' => $result['lunar_day_chinese'],
                'ganzhi_year' => $result['ganzhi_year'],
                'ganzhi_month' => $result['ganzhi_month'],
                'ganzhi_day' => $result['ganzhi_day'],
                'animal' => $result['animal'],
                'term' => $result['term'],
                'is_leap' => $result['is_leap'],
                'gregorian_year' => $result['gregorian_year'],
                'gregorian_month' => $result['gregorian_month'],
                'gregorian_day' => $result['gregorian_day'],
                'week_no' => $result['week_no'],
                'week_name' => $result['week_name'],
                'constellation' => $result['constellation']
            ]);

            $date->modify('+1 days');
        }
    }
}
