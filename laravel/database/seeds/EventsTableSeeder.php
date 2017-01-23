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
        factory(App\Event::class, 100)->create();

//        DB::table('events')->delete();
//
//        $faker = Faker::create('en_US');
//        //$faker = Faker::create('ja_JP');
//
//        $member_id = App\Member::getIds();
//
//        $year = [
//            '2015', '2016', '2017'
//        ];
//
//        $month = [
//            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
//        ];
//
//        $day = [
//            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
//            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
//            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
//        ];
//
//        for ($i = 0; $i < (365 * 4 + 1); $i++) {
//            $random_date = $year[array_rand($year)]
//                ."-".$month[array_rand($month)]
//                ."-".$day[array_rand($day)];
//
//            App\Event::create([
//                'member_id' => $member_id[array_rand($member_id)],
//                'content'=> $faker->sentence(),
//                'date'=> $random_date
//            ]);
//        }
    }
}
