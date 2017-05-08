<?php

//use Mockery as m;
use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Nuts\Api\Controllers\JwtUserController;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DataControllerTest extends TestCase
{
    use ApiTestTrait, JwtAuthJsonResponse;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
    }

    public function tearDown()
    {
//        m::close();
    }

    /** @test */
    public function error_index_no_login()
    {
        $user = factory(\App\User::class)
            ->create(['password' => bcrypt('password')]);

        $json = $this->getToJson('/api/v1/data');

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);
        $this->assertContains('error', $json);
        $this->assertContains(400, $json);
        $this->assertContains('token invalid', $json);
    }

    /** @test */
    public function error_index_user_calendar_not_found()
    {
        $user = factory(\App\User::class)
            ->create(['password' => bcrypt('password')]);

        $loginJson = $this->postToJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $json = $this->getToJson('/api/v1/data');

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);
        $this->assertContains('error', $json);
        $this->assertContains(400, $json);
        $this->assertContains('user calendar not found', $json);
    }

    /** @test */
    public function success_index()
    {
        App\User::create([
            'email' => 'test@test.com',
            'name' => 'test',
            'password' => bcrypt('password')
        ]);

        $loginJson = $this->postToJson('/api/v1/login', [
            'email' => 'test@test.com',
            'password' => 'password'
        ]);

        $json = $this->getToJson('/api/v1/data');

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);
        $this->assertArrayHasKey('currentuser', $json);
        $this->assertArrayHasKey('usercalendar', $json);
//        $this->assertArrayHasKey('currentCalendarId', $json);
//        $this->assertArrayHasKey('days', $json);
//        $this->assertArrayHasKey('members', $json);
//        $this->assertArrayHasKey('events', $json);

        $this->assertContains('success', $json);
        $this->assertContains(200, $json);
        $this->assertContains('application data', $json);

        $this->assertInternalType('string', $json['status']);
        $this->assertInternalType('int', $json['code']);
        $this->assertInternalType('string', $json['message']);
        $this->assertInternalType('array', $json['currentuser']);
        $this->assertInternalType('array', $json['usercalendar']);
//        $this->assertInternalType('int', $json['currentCalendarId']);
//        $this->assertInternalType('array', $json['days']);
//        $this->assertInternalType('array', $json['members']);
//        $this->assertInternalType('array', $json['events']);
    }
}
