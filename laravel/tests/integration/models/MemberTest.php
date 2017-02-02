<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MemberTest extends TestCase
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
            'email' => 'test@test.com',
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

    }

    /** @test */
    public function it_can_be_created() {
        $this->seeInDatabase('members', [
            'user_calendar_id' => $this->userCalendar->id,
            'name' => 'Test Member',
            'color' => 'Test color'
        ]);
    }

    /** @test */
    public function it_will_be_appended_column_named_is_hover_which_has_false_as_a_value()
    {
        $this->assertFalse($this->member->isHover);
    }

}
