<?php

use Faker\Factory as FakerFactory;

function getPrimaryKey() {
//    return md5( uniqid(mt_rand(), true) );

    // 奇数その1の乗算
	$v *= 0x1ca7bc5b;
	$v &= 0x7FFFFFFF; // 下位31ビットだけ残して正の数であることを保つ

	// ビット上下逆転
	$v = ($v >> 15) | (($v & 0x7FFF) << 16);

	// 奇数その2（奇数その1の逆数）の乗算
	$v *= 0x6b5f13d3;
	$v &= 0x7FFFFFFF; // 下位31ビットだけ残して正の数であることを保つ

	// ビット上下逆転
	$v = ($v >> 15) | (($v & 0x7FFF) << 16);

	// 奇数その1の乗算
	$v *= 0x1ca7bc5b;
	$v &= 0x7FFFFFFF; // 下位31ビットだけ残して正の数であることを保つ

	return $v;
}

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
        'id' => 'u_'.md5( uniqid(mt_rand(), true) ),
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(Nuts\Calendar\Models\UserCalendar::class, function (Faker\Generator $faker) {
    foreach( App\User::all(['id']) as $val ) {
        $userIds[] = $val->id;
    }

    return [
        'id' => 'uc_'.md5( uniqid(mt_rand(), true) ),
        'name' => $faker->word,
        'description' => $faker->sentence,
        'user_id' => $faker->randomElement($userIds),
    ];
});

//function autoIncrement()
//{
//    for ($i = 0; $i < 1000; $i++) {
//        yield $i;
//    }
//}
//
//$autoIncrement = autoIncrement();
//$factory->define(Nuts\Calendar\Models\Member::class, function (Faker\Generator $faker) use ($autoIncrement) {
//    $autoIncrement->next();
//    $colors = ['primary', 'info', 'danger'];
//
//    foreach( Nuts\Calendar\Models\UserCalendar::all(['id']) as $val ) {
//        $userCalendarIds[] = $val->id;
//    }
//
//    return [
//        'name' => $faker->name,
//        'order' => $autoIncrement->current(),
//        'color' => $faker->randomElement($colors),
//        'user_calendar_id' => $faker->randomElement($userCalendarIds),
//    ];
//});

$factory->define(Nuts\Calendar\Models\Member::class, function (Faker\Generator $faker) {
    foreach( App\User::all(['id']) as $val ) {
        $userIds[] = $val->id;
    }

    return [
        'id' => 'm_'.md5( uniqid(mt_rand(), true) ),
        'name' => $faker->name,
        'description' => $faker->sentence,
        'user_id' => $faker->randomElement($userIds),
    ];
});

$factory->define(Nuts\Calendar\Models\Item::class, function (Faker\Generator $faker) {

    //$faker = FakerFactory::create('ja_JP');

    $year = [
//        '2015', '2016', '2017'
        '2017'
    ];

    $month = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ];

    $day = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    $randomDate = $year[array_rand($year)]
        ."-".$month[array_rand($month)]
        ."-".$day[array_rand($day)];

    $hour = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
    ];

    $minits = [
        '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
    ];

    $startTime = $hour[array_rand($hour)]
        .":".$minits[array_rand($minits)];

    $endTime = $hour[array_rand($hour)]
        .":".$minits[array_rand($minits)];

    if( $startTime > $endTime ) {
        list($startTime, $endTime) = array($endTime, $startTime);
    }

    foreach( Nuts\Calendar\Models\Member::all(['id']) as $val ) {
        $memberIds[] = $val->id;
    }

    foreach( Nuts\Calendar\Models\ItemType::all(['id']) as $val ) {
        $itemTypeIds[] = $val->id;
    }

    return [
        'member_id' => $faker->randomElement($memberIds),
        'type_id' => $faker->randomElement($itemTypeIds),
        'content'=> $faker->word(),
        'date' => $randomDate,
        'start_time' => $startTime,
        'end_time' => $endTime,
        'memo' => $faker->sentence()
    ];
});
