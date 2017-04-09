<?php

//use Mockery as m;
use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiLoginTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    protected $loginUri = '/api/v1/login';

    public function setUp()
    {
        parent::setUp();

    }

    public function tearDown()
    {
//        m::close();
    }

    /** @test */
    public function success_login()
    {
        $user = \App\User::create([
            'name' => 'login test user',
            'email' => 'login@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postToJson($this->loginUri, [
            'email' => 'login@test.com',
            'password' => 'password'
        ]);
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function login_failed_invalid_credentials()
    {
        $json = $this->postToJson($this->loginUri, [
            'email' => 'login@test.com',
            'password' => 'failedpassword'
        ]);
        $this->assertError($json, CODE_INVALID_CREDENTIALS, '/^'.INVALID_CREDENTIALS.'$/');

        $json = $this->postToJson($this->loginUri, [
            'email' => 'hoge@hoge.com',
            'password' => 'password'
        ]);
        $this->assertError($json, CODE_INVALID_CREDENTIALS, '/^'.INVALID_CREDENTIALS.'$/');
    }

    /** @test */
    public function login_failed_validation_password_requierd()
    {
        $json = $this->postToJson($this->loginUri, [
            'email' => 'login@test.com',
            'password' => ''
        ]);
        $this->assertEquals('The password field is required.', $json['password'][0]);
    }

    /** @test */
    public function login_failed_validation_error_email_required()
    {
        $json = $this->postToJson($this->loginUri, [
            'email' => '',
            'password' => 'password'
        ]);
        $message = 'The email field is required.';
        $this->assertEquals($message, $json['email'][0]);
    }

    /** @test */
    public function login_throtteles()
    {
        $user = \App\User::create([
            'name' => 'hoge',
            'email' => 'throttles@test.com',
            'password' => bcrypt('password')
        ]);

        for($i=0; $i<6; $i++) {
            $json = $this->postToJson($this->loginUri, [
                'email' => 'hoge@hoge.com',
                'password' => 'hogehoge'
            ]);
        }

        $message = '/^'.TOO_MANY_LOGIN_ATTEMPTS.'$/';
        $this->assertError($json, 429, $message);
    }
}
