<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Nuts\Calendar\Models\Member::class, 50)->create();
    }
}
