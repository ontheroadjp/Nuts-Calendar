<?php

use App\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Nuts\Calendar\Models\Member;
use Nuts\Calendar\Models\UserCalendar;
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

        // user
        $this->call(UsersTableSeeder::class);

        // user calendar
        $this->call(UserCalendarsTableSeeder::class);

        // member
//        $faker = Faker::create('en_US');
//        foreach( User::all(['id']) as $val ) {
//            for( $i=1; $i<rand(3, 6); $i++ ) {
//                Member::create([
//                    'name' => $faker->name,
//                    'user_id' => $val->id,
//                ]);
//            }
//        }
        $this->call(MembersTableSeeder::class);


        // item type
        $this->call(ItemTypesTableSeeder::class);

        // item
        $this->call(ItemsTableSeeder::class);

        // holiday
        $this->call(HolidaysTableSeeder::class);

        // calendar(date)
        $this->call(CalendarTableSeeder::class);

        Model::reguard();
    }
}
