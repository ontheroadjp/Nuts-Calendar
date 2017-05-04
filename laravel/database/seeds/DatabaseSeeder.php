<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UsersTableSeeder::class);
        $this->call(UserCalendarsTableSeeder::class);

        $faker = Faker::create('en_US');

        foreach( Nuts\Calendar\Models\UserCalendar::all(['id']) as $val ) {
            for( $i=1; $i<5; $i++ ) {
                Nuts\Calendar\Models\Member::create([
                    'name' => $faker->name,
                    'order' => $i,
                    'color' => 'primary',
                    'user_calendar_id' => $val->id,
                ]);
            }
        }

//        foreach( Nuts\Calendar\Models\UserCalendar::all(['id']) as $val ) {
//            $userCalendarIds[] = $val->id;
//        }
//
//        for($n=0; $n<count($userCalendarIds); $n++){
//            for( $i=1; $i<5; $i++ ) {
//                Nuts\Calendar\Models\Member::create([
//                    'name' => $faker->name,
//                    'order' => $i,
//                    'color' => 'primary',
//                    'user_calendar_id' => $userCalendarIds[$n],
//                ]);
//            }
//        }

        //$this->call(MembersTableSeeder::class);
        $this->call(EventsTableSeeder::class);
        $this->call(CalendarTableSeeder::class);

        Model::reguard();
    }
}
