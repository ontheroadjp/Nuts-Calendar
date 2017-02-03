<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EventTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;
    protected $userCalendar;
    protected $member;

    public function setUp()
    {
        parent::setUp();

        $this->user = App\User::create([
            'name' => 'test user',
            'email' => 'test2@test.com',
            'password' => 'password'
        ]);

        $this->userCalendar = App\UserCalendar::create([
            'user_id' => $this->user->id,
            'name' => 'UserCalendar TEST'
        ]);

        $this->member = App\Member::create([
            'user_calendar_id' => $this->userCalendar->id,
            'name' => 'Test Member',
            'color' => 'Test color'
        ]);

        $this->event = App\Event::create([
            'member_id' => $this->member->id,
            'content' => 'TEST EVENT',
            'date' => '2011-03-14'
        ]);

    }

    public function tearDown()
    {

    }

    /** @test */
    public function it_has_is_hovor_extra_propaty() {
        //var_dump($this->event);
    }

}
