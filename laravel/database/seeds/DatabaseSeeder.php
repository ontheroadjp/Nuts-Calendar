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

        // userplan
        $this->call(UserplansTableSeeder::class);

        // user
        $this->call(UsersTableSeeder::class);

        // user calendar
        $this->call(UserCalendarsTableSeeder::class);

        // member
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
