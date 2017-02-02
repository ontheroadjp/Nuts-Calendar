<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserCalendarTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;
    protected $userCalendar;

    public function setUp()
    {
        parent::setUp();

        $this->user = App\User::create([
            'name' => 'test user',
            'email' => 'test@test.com',
            'password' => 'password'
        ]);

        $this->userCalendar = App\UserCalendar::create([
            'user_id' => $this->user->id,
            'name' => 'UserCalendar TEST'
        ]);

    }
    /** @test */
    public Function it_can_be_created()
    {
        $this->seeInDatabase('user_calendars', [
            'user_id' => $this->user->id,
            'name' => 'UserCalendar TEST'
        ]);
    }

    /** @test */
    public function member_can_be_created_when_it_was_created()
    {
        $this->assertEquals(1, $this->userCalendar->members->count());
    }

    /** @test */
    public function it_can_obtain_member_collection()
    {
        $this->userCalendar->members->each(function($item, $key) {
            $this->assertInstanceOf(App\Member::class, $item);
        });
    }

}
