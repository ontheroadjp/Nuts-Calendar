<?php

use Faker\Factory as FakerFactory;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
        'api_token' => str_random(60),
    ];
});

$factory->define(App\UserCalendar::class, function (Faker\Generator $faker) {
    $userIds = getIds(App\User::all(['id']));
    return [
        'name' => $faker->word,
        'user_id' => $faker->randomElement($userIds),
    ];
//    return [
//        'name' => $faker->word,
//        'user_id' => factory(App\User::class)->create()->id,
//    ];
});

$factory->define(App\Member::class, function (Faker\Generator $faker) {

    //$faker = FakerFactory::create('ja_JP');

    $colors = ['primary', 'info', 'danger'];
    $userCalendars = App\UserCalendar::all();

    $userCalendarIds = getIds(App\UserCalendar::all(['id']));

    return [
        'name' => $faker->name,
        'color' => $faker->randomElement($colors),
        'user_calendar_id' => $faker->randomElement($userCalendarIds),
    ];

});

function getIds( Illuminate\Support\Collection $col ) {
    foreach( $col as $val ) {
        $ids[] = $val->id;
    }
    return $ids;
}

$factory->define(App\Event::class, function (Faker\Generator $faker) {

    //$faker = FakerFactory::create('ja_JP');

    $year = [
        '2015', '2016', '2017'
    ];

    $month = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ];

    $day = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    $memberIds = getIds(App\Member::all(['id']));

    $randomDate = $year[array_rand($year)]
        ."-".$month[array_rand($month)]
        ."-".$day[array_rand($day)];

    return [
        'member_id' => $faker->randomElement($memberIds),
        'content'=> $faker->sentence(),
        'date' => $randomDate
    ];
});
