<?php

use Mockery as m;
use Illuminate\Http\Request;
use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class JwtAuthJsonResponseUnitTest extends TestCase
{
    use ApiTestTrait, JwtAuthJsonResponse;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
    }

    public function tearDown()
    {
        m::close();
    }

    /** @test */
    public function success_SEND_USER_WITH_JWT_TOKEN()
    {
        \JWTAuth::shouldReceive('authenticate')->once()->andReturn(new \App\User());
        $json = $this->sendUserWithJwtToken('token');
        $this->assertEquals($json->getStatusCode(), 200);
    }

    /** @test */
    public function success_SEND_USER_WITH_REFRESHED_JWT_TOKEN()
    {
        $token = m::mock('\Tymon\JWTAuth\Token');

        JWTAuth::shouldReceive('refresh')->once()->andReturn($token);
        JWTAuth::shouldReceive('authenticate')->andReturn(new \App\User());
        $token->shouldReceive('get')->andReturn('hoge.foo.bar');

        $json = $this->sendUserWithRefreshedJwtToken($token);
        $this->assertEquals($json->getStatusCode(), 202);
    }

    /** @test */
    public function failed_SEND_USER_WITH_REFRESHED_JWT_TOKEN()
    {
        $token = m::mock('\Tymon\JWTAuth\Token');

        $json = $this->sendUserWithRefreshedJwtToken($token);
        $this->assertEquals($json->getStatusCode(), 500);
    }

}
