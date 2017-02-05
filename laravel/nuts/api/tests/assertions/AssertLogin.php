<?php

namespace Nuts\Api\Test\Assertions;

trait AssertLogin
{
    // these abstract methods are implemented in Nuts\Api\Test\ApiTestTreat.php
    abstract protected function postHttpJsonResponseAsArray($uri, $parameters);
    abstract protected function assertSendUserWithJwtToken($json, $newToken = true);
    abstract protected function assertError($json, $code, $message);

    protected $loginUri = '/api/v1/login';

    protected $loginTestUser = [
        'name' => 'login test user temp',
        'email' => 'login@test.com.hk',
        'password' => 'testtest'
    ];

    /** @test */
    public function success_login()
    {
        $user = \App\User::create([
            'name' => 'login test user',
            'email' => 'login@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => 'login@test.com',
            'password' => 'password'
        ]);
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function login_failed_invalid_credentials()
    {
        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => $this->loginTestUser['email'],
            'password' => 'failedpassword'
        ]);
        $this->assertError($json, 401, '/^'.INVALID_CREDENTIALS.'$/');

        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => 'failed@failed.com',
            'password' => $this->loginTestUser['password']
        ]);
        $this->assertError($json, 401, '/^'.INVALID_CREDENTIALS.'$/');
    }

    /** @test */
    public function login_failed_validation_password_requierd()
    {
        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => $this->loginTestUser['email'],
            'password' => ''
        ]);
        $message = '/^{"password":\["The password field is required."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function login_failed_validation_error_email_required()
    {
        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => '',
            'password' => $this->loginTestUser['password']
        ]);
        $message = '/^{"email":\["The email field is required."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function login_failed_validation_error_password_min_6()
    {
        $json = $this->postHttpJsonResponseAsArray($this->loginUri, [
            'email' => $this->loginTestUser['email'],
            'password' => 'hoge'
        ]);
        $message = '/^{"password":\["The password must be at least 6 characters."\]}$/';
        $this->assertError($json, 400, $message);
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
            $json = $this->postHttpJsonResponseAsArray('/api/v1/login', [
                'email' => 'throttles@test.com',
                'password' => 'bad-password'
            ]);
        }

        $message = '/^'.TOO_MANY_LOGIN_ATTEMPTS.'$/';
        $this->assertError($json, 429, $message);
    }
}
