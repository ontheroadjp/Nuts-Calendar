<?php

use Illuminate\Database\Seeder;

class UserplansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nuts\Calendar\Models\Userplan::create([
            'name' => 'free',
            'max_calendars' => 3,
            'max_members' => '6',
            'max_shared_members' => 0,
            'initial_fee' => 0,
            'monthly_fee' => 0
        ]);

//        App\Userplan::create([
//            'name' => 'personal',
//            'max_calendars' => 2,
//            'max_members' => '8',
//            'max_shared_members' => 0,
//            'initial_fee' => 0,
//            'monthly_fee' => 300
//        ]);
//
//        App\Userplan::create([
//            'name' => 'family',
//            'max_calendars' => 2,
//            'max_members' => '8',
//            'max_shared_members' => 1,
//            'initial_fee' => 0,
//            'monthly_fee' => 500
//        ]);
//
//        App\Userplan::create([
//            'name' => 'team-10',
//            'max_calendars' => 5,
//            'max_members' => '10',
//            'max_shared_members' => 10,
//            'initial_fee' => 0,
//            'monthly_fee' => 1800
//        ]);
//
//        App\Userplan::create([
//            'name' => 'team-30',
//            'max_calendars' => 5,
//            'max_members' => '30',
//            'max_shared_members' => 30,
//            'initial_fee' => 0,
//            'monthly_fee' => 4800
//        ]);
//
//        App\Userplan::create([
//            'name' => 'team-100',
//            'max_calendars' => 10,
//            'max_members' => '100',
//            'max_shared_members' => 100,
//            'initial_fee' => 0,
//            'monthly_fee' => 16800
//        ]);
    }
}
