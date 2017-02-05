<?php

namespace Nuts\Api\Test\Assertions;

trait AssertRegister
{

    // these abstract methods are implemented in Nuts\Api\Test\ApiTestTreat.php
    abstract protected function postHttpJsonResponseAsArray($uri, $parameters);
    abstract protected function assertSendUserWithJwtToken($json, $newToken = true);
    abstract protected function assertError($json, $code, $message);

    protected $registerTestUser = [
        'name' => 'register test user',
        'email' => 'register@test.com',
        'password' => 'testtest'
    ];

    /** @test */
    public function register_shuld_be_done_successfully()
    {
        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', [
            'name' => 'new registration user',
            'email' => 'register@test.com',
            'password' => 'registerregister',
            'password_confirmation' => 'registerregister'
        ]);
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function register_failed_duplicate_entry()
    {
        $this->user = \App\User::create($this->registerTestUser);

        $params = $this->registerTestUser;
        $params += ['password_confirmation' => $this->registerTestUser['password']];
        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $params);

        // for validation error
        $message = '/^{"email":\["The email has already been taken."\]}$/';
        $this->assertError($json, 400, $message);

        // for SQL error (PDOException)
        //$message = '/^SQLSTATE\[23000\]: Integrity constraint violation: 1062 Duplicate entry.*$/';
        //$this->assertError($json, 500, $message);
    }

    private function createNewUserForRegistration()
    {
        $params = $this->registerTestUser;
        return $params += ['password_confirmation' => $this->registerTestUser['password']];
    }

    /** @test */
    public function register_validation_error_name_requierd()
    {
        $userParam = $this->createNewUserForRegistration();

        $userParam['name'] = '';
        $userParam['email'] = 'register@test.com';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $userParam);
        $message = '/^{"name":\["The name field is required."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function register_validation_error_email_requierd()
    {
        $userParam = $this->createNewUserForRegistration();

        $userParam['email'] = '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $userParam);
        $message = '/^{"email":\["The email field is required."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function register_validation_error_password_requierd()
    {
        $userParam = $this->createNewUserForRegistration();

        $userParam['password'] = '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $userParam);
        $message = '/^{"password":\["The password field is required."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function register_validation_error_password_min_6()
    {
        $userParam = $this->createNewUserForRegistration();

        $userParam['password'] = '1234';
        $userParam['password_confirmation'] = '1234';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $userParam);
        $message = '/^{"password":\["The password must be at least 6 characters."\]}$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function register_validation_error_password_confirmation_requierd()
    {
        $userParam = $this->createNewUserForRegistration();

        $userParam['password_confirmation'] = $userParam['password'].'failed';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/register', $userParam);
        $message = '/^{"password":\["The password confirmation does not match."\]}$/';
        $this->assertError($json, 400, $message);
    }
}
