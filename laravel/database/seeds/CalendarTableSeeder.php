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

        $date = new DateTime("2016-01-01");
//        $days = 365 * 30 + 1;
        $days = 365 * 6 + 1;

        $chineseCalendar = new ChineseCalendar();

        for ($i = 0; $i < $days; $i++) {

            $y = $date->format('Y');
            $m = $date->format('m');
            $d = $date->format('d');

            $result = $chineseCalendar->solar($y, $m, $d);

            if( $d == 1 )
            {
                $this->createMCalendar($y, $m, $result);
            }

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
                'constellation' => $result['constellation'],
                'is_today' => $result['is_today']
            ]);

            $date->modify('+1 days');
        }
    }

    public function createMCalendar($y, $m, $result)
    {
            Calendar::create([
                'date' => $y.'-'.$m.'-00',
                'lunar_year' => $result['lunar_year'],
                'lunar_month' => $result['lunar_month'],
//                'lunar_day' => $result['lunar_day'],
                'lunar_month_chinese' => $result['lunar_month_chinese'],
//                'lunar_day_chinese' => $result['lunar_day_chinese'],
                'ganzhi_year' => $result['ganzhi_year'],
                'ganzhi_month' => $result['ganzhi_month'],
//                'ganzhi_day' => $result['ganzhi_day'],
                'animal' => $result['animal'],
                'term' => $result['term'],
                'is_leap' => $result['is_leap'],
                'gregorian_year' => $result['gregorian_year'],
                'gregorian_month' => $result['gregorian_month'],
//                'gregorian_day' => $result['gregorian_day'],
                'week_no' => $result['week_no'],
                'week_name' => $result['week_name'],
                'constellation' => $result['constellation'],
//                'is_today' => $result['is_today']
            ]);
    }
}
