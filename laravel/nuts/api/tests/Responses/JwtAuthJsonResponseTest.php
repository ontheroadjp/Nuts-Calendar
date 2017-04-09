<?php

use Mockery as m;
use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class JwtAuthJsonResponseTest extends TestCase
{
    use ApiTestTrait, JwtAuthJsonResponse;
    use DatabaseTransactions;

    /**
     * @var App\User - password: 'password'
     * @access protected
     */
    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(\App\User::class)
            ->create(['password' => bcrypt('password')]);
    }

    public function tearDown()
    {
        m::close();
    }

    /** @test */
    public function success_send_user_with_jwt_token()
    {
        $json = $this->postToJson('/api/v1/login', [
            'email' => $this->user->email,
            'password' => 'password'
        ]);

        $json = $this->sendUserWithJwtToken($json['token']);
        $jsonArr = $json->getData(true);

        $this->assertSendUserWithJwtToken($jsonArr);
    }

    /** @test */
    public function return_json_400_token_invalid()
    {
        $json = $this->getAuthenticatedUser('hoge.foo.bar')->getData(true);
        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @expectedException TokenExpiredException */
    public function throwing_the_exception_by_send_user_with_jwt_token()
    {
        $exception = new TokenExpiredException();
        JWTAuth::shouldReceive('authenticate')->once()->andThrow($exception);

        $this->sendUserWithJwtToken('hoge.foo.bar');
    }

    /** @test */
    public function success_refresh_token()
    {
        JWTAuth::shouldReceive('refresh')->andReturn('refresh.token.here');
        $refreshed = $this->refreshToken('hoge.foo.bar');

        $this->assertEquals('refresh.token.here', $refreshed);
    }

    /** @test */
    public function success_send_user_with_refreshed_jwt_token()
    {
        $exception = new TokenExpiredException();

        $oldToken = 'token.token.token';
        $refreshedToken = 'new.new.new';

        JWTAuth::shouldReceive('authenticate')->once()->andThrow($exception);
        JWTAuth::shouldReceive('authenticate')->once()->andReturn($this->user);
        JWTAuth::shouldReceive('refresh')->once()->andReturn($refreshedToken);
        //JWTAuth::makePartial();

        $response = $this->sendUserWithJwtToken($oldToken);
        $jsonArr = $response->getData(true);

        $this->assertInstanceOf('\Illuminate\Http\JsonResponse', $response);
        $this->assertSendUserWithJwtToken($jsonArr, true);
        $this->assertEquals($refreshedToken, $jsonArr['token']);
    }
}
