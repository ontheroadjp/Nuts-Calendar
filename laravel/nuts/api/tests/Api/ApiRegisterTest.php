<?php

use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiRegisterTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    /** @test */
    public function register_shuld_be_done_successfully()
    {
        $json = $this->postToJson('/api/v1/register', [
            'name' => 'new user',
            'email' => 'register@test.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function register_failed_duplicate_entry()
    {
        $userParams = [
            'name' => 'register test user',
            'email' => 'register@test.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $this->user = \App\User::create($userParams);
        $json = $this->postToJson('/api/v1/register', $userParams);

        // for validation error
        $message = 'The email has already been taken.';
        $this->assertEquals($message, $json['email'][0]);

        // for SQL error (PDOException)
        //$message = '/^SQLSTATE\[23000\]: Integrity constraint violation: 1062 Duplicate entry.*$/';
        //$this->assertError($json, 500, $message);
    }

    /** @test */
    public function register_validation_error_name_requierd()
    {
        $userParams = [
            'name' => '',
            'email' => 'register@test.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $json = $this->postToJson('/api/v1/register', $userParams);
        $message = 'The name field is required.';
        $this->assertEquals($message, $json['name'][0]);
    }

    /** @test */
    public function register_validation_error_email_requierd()
    {
        $userParams = [
            'name' => 'register test user',
            'email' => '',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $json = $this->postToJson('/api/v1/register', $userParams);
        $message = 'The email field is required.';
        $this->assertEquals($message, $json['email'][0]);
    }

    /** @test */
    public function register_validation_error_password_requierd()
    {
        $userParams = [
            'name' => 'register test user',
            'email' => 'register@test.com',
            'password' => '',
            'password_confirmation' => 'password'
        ];

        $json = $this->postToJson('/api/v1/register', $userParams);
        $message = 'The password field is required.';
        $this->assertEquals($message, $json['password'][0]);
    }

    /** @test */
    public function register_validation_error_password_min_6()
    {
        $userParams = [
            'name' => 'register test user',
            'email' => 'register@test.com',
            'password' => '1234',
            'password_confirmation' => '1234'
        ];

        $json = $this->postToJson('/api/v1/register', $userParams);
        $message = 'The password must be at least 6 characters.';
        $this->assertEquals($message, $json['password'][0]);
    }

    /** @test */
    public function register_validation_error_password_confirmation_requierd()
    {
        $userParams = [
            'name' => 'register test user',
            'email' => 'register@test.com',
            'password' => 'password',
            'password_confirmation' => ''
        ];

        $json = $this->postToJson('/api/v1/register', $userParams);
        $message = 'The password confirmation does not match.';
        $this->assertEquals($message, $json['password'][0]);
    }
}
