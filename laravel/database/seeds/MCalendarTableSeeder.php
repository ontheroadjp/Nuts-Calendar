<?php

use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\MCalendar;
use Nuts\Calendar\Libs\ChineseCalendar as ChineseCalendar;

class MCalendarTableSeeder extends Seeder
{
//    /**
//     * Run the database seeds.
//     *
//     * @return void
//     */
//    public function run()
//    {
//        DB::table('m_calendar')->delete();
//
//        $chineseCalendar = new ChineseCalendar();
//
//        $day = 1;
//
////        for( $y = 2016; $y < 2036; $y++ ) {
//        for( $y = 2016; $y < 2020; $y++ ) {
//            for( $m = 1; $m < 13; $m++ ) {
//                $result = $chineseCalendar->solar($y, $m, 1);
//                $yyyy = sprintf('%04d', $result['gregorian_year']);
//                $mm = sprintf('%02d', $result['gregorian_month']);
//                MCalendar::create([
//                    'gregorian_yyyymm' => $yyyy.$mm,
//                    'lunar_year' => $result['lunar_year'],
//                    'lunar_month' => $result['lunar_month'],
//                    'lunar_month_chinese' => $result['lunar_month_chinese'],
//                    'ganzhi_year' => $result['ganzhi_year'],
//                    'ganzhi_month' => $result['ganzhi_month'],
//                    'animal' => $result['animal'],
//                    'gregorian_year' => $result['gregorian_year'],
//                    'gregorian_month' => $result['gregorian_month']
//                ]);
//            }
//        }
//    }
}
