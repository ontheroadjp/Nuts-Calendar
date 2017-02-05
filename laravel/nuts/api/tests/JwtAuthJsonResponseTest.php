<?php

use Mockery as m;
use Illuminate\Http\Request;
use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class JwtAuthJsonResponseTest extends TestCase
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
    public function return_the_json_with_a_user_and_a_jwt_token()
    {
        $user = \App\User::create([
            'name' => 'jwt token test',
            'email' => 'jwttoken@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postHttpJsonResponseAsArray('/api/v1/login', [
            'email' => 'jwttoken@test.com',
            'password' => 'password'
        ]);

        $token = $json['token'];

        $json = $this->sendUserWithJwtToken($token)->getData(true);
        $this->assertSendUserWithJwtToken($json);
        $this->assertTrue($json['token'] === $token);
    }

    /** @test */
    public function return_the_json_with_a_user_and_a_refreshed_jwt_token()
    {
        $user = new \App\User([
            'name' => 'token refreshed test',
            'email' => 'refreshed@test.com',
        ]);
        $user->id = 1234;
        $user->created_at = '1900-01-01';
        $user->updated_at = '1900-01-01';

        $manager = m::mock('\Tymon\JWTAuth\JWTManager');
        $jwtAuthUser = m::mock('\Tymon\JWTAuth\Providers\User\UserInterface');
        $auth = m::mock('\Tymon\JWTAuth\Providers\Auth\AuthInterface');

        $jwtAuth = new \Tymon\JWTAuth\JWTAuth(
            $manager, $jwtAuthUser, $auth, Request::create('/foo', 'GET')
        );

        $jwtAuth = $jwtAuth->setToken(
            new \Tymon\JWTAuth\Token('old.token.here')
        );

        $manager->shouldReceive('decode');
        $jwtAuthUser->shouldReceive('getBy')->andReturn($user);

        $exception = new \Tymon\JWTAuth\Exceptions\TokenExpiredException('Token has expired');
        $refreshedToken = 'refreshed.token.here';
        JWTAuth::shouldReceive('authenticate')->once()->andThrow($exception);
        JWTAuth::shouldReceive('refresh')->once()->andReturn($refreshedToken);
        JWTAuth::shouldReceive('setToken')->once()->andReturn($jwtAuth);

        $json = $this->sendUserWithJwtToken('hoge.foo.bar')->getData(true);

        $this->assertSendUserWithJwtToken($json, true);
        $this->assertTrue($json['token'] === $refreshedToken);
    }

    /** @test */
    public function return_the_json_with_token_invalid_error()
    {
        $token = 'hoge.foo.bar';
        $json = $this->sendUserWithJwtToken($token)->getData(true);
        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @test */
    public function return_the_json_with_token_expired_and_unrefreshable_error()
    {
        $manager = m::mock('Tymon\JWTAuth\JWTManager');
        $user = m::mock('Tymon\JWTAuth\Providers\User\UserInterface');
        $auth = m::mock('Tymon\JWTAuth\Providers\Auth\AuthInterface');

        $jwtAuth = new \Tymon\JWTAuth\JWTAuth(
            $manager, $user, $auth, Request::create('/foo', 'GET')
        );

        $exception = new \Tymon\JWTAuth\Exceptions\TokenExpiredException('Token has expired');
        JWTAuth::shouldReceive('authenticate')->once()->andThrow($exception);
        JWTAuth::shouldReceive('refresh')->once()->andReturn('hoge.foo.bar');
        JWTAuth::shouldReceive('setToken')->once()->andReturn($jwtAuth);

        $json = $this->sendUserWithJwtToken('hoge.foo.bar')->getData(true);
        $this->assertError($json, 500, '/^'.TOKEN_EXPIRED_AND_UNREFRESHABLE.'$/');
    }

}
