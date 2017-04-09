<?php

use Mockery as m;
use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Nuts\Api\Controllers\JwtUserController;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class JwtUserControllerTest extends TestCase
{
    use ApiTestTrait, JwtAuthJsonResponse;
    use DatabaseTransactions;

    /**
     * @var App\User - password: 'password'
     * @access protected
     */
    protected $user;
    protected $loginJson;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(\App\User::class)
            ->create(['password' => bcrypt('password')]);

        $loginJson = $this->postToJson('/api/v1/login', [
            'email' => $this->user->email,
            'password' => 'password'
        ]);
    }

    public function tearDown()
    {
        m::close();
    }

    /** @test */
    public function success_get_me()
    {
        $json = $this->getToJson('/api/v1/me');
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function success_put_settings()
    {
        $json = $this->postToJson('/api/v1/me/settings', [
            'name' => 'hogehoge',
            '_method' => 'PUT',
        ]);

        $this->assertSendUserWithJwtToken($json);
    }
}
