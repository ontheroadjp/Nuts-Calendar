<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = App\User::create([
            'name' => 'test user',
            'email' => 'test@test.com',
            'password' => 'password'
        ]);
    }

    /** @test */
    public function it_can_be_created()
    {
        $this->seeInDatabase('users', ['name' => 'test user']);
        $this->assertInstanceOf(App\User::class, $this->user);
    }

    /** @test */
    public function it_will_create_user_calendar_when_it_was_created()
    {
        $this->seeInDatabase('user_calendars', ['name' => 'First Calendar']);
    }

    /** @test */
    public function it_can_obtain_user_calendar_collection()
    {
        $this->user->userCalendars->each(function($item, $key) {
            $this->assertInstanceOf(App\UserCalendar::class, $item);
        });
    }

    /** @test */
    public function it_should_have_only_one_user_calendar()
    {
        $userCalendars = $this->user->userCalendars;
        $this->assertEquals(1, $userCalendars->count());
    }

}
