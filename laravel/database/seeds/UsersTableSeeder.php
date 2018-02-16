<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //factory(App\User::class, 3)->create();

        App\User::create([
            'id' => 'u_'.md5( uniqid(mt_rand(), true) ),
            'name' => 'hoge',
            'email' => 'hoge@hoge.com',
            'password' => bcrypt('hogehoge'),
            'userplan_id' => 1
        ]);
    }
}
