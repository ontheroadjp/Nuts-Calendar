<?php

use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\MCalendar;
use Nuts\Calendar\Libs\ChineseCalendar as ChineseCalendar;

class MCalendarTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('m_calendar')->delete();

        $chineseCalendar = new ChineseCalendar();

        for( $y = 2016; $y < 2036; $y++ ) {
            for( $m = 1; $m < 13; $m++ ) {
                $result = $chineseCalendar->solar($y, $m, 1);
                MCalendar::create([
                    'lunar_year' => $result['lunar_year'],
                    'lunar_month' => $result['lunar_month'],
                    'lunar_month_chinese' => $result['lunar_month_chinese'],
                    'ganzhi_year' => $result['ganzhi_year'],
                    'ganzhi_month' => $result['ganzhi_month'],
                    'animal' => $result['animal'],
                    'gregorian_year' => $result['gregorian_year'],
                    'gregorian_month' => $result['gregorian_month']
                ]);
            }
        }
    }
}
