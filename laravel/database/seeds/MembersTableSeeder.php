<?php

use App\Member;
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
        DB::table('members')->delete();

        $faker = Faker::create('en_US');

        $feed_types = [
            [ 'name' => $faker->name(), 'color' => 'primary' ],
            [ 'name' => $faker->name(), 'color' => 'warning' ],
            [ 'name' => $faker->name(), 'color' => 'info' ]
        ];

        foreach ($feed_types as $feed_type) {
           Member::create($feed_type);
        }
    }
}
