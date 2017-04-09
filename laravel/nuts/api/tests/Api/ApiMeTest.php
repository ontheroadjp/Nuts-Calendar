<?php

use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiMeTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    /** @test */
    public function success_when_token_is_valid()
    {
        \App\User::create([
            'name' => 'test api me',
            'email' => 'me@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postToJson('/api/v1/login', [
            'email' => 'me@test.com',
            'password' => 'password'
        ]);

        $json = $this->getToJson('/api/v1/me', [
            'token' => $json['token']
        ]);

        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function error_when_no_token()
    {
        $json = $this->getToJson('/api/v1/me', [ ]);
        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @test */
    public function error_when_token_is_invalid__bad_format()
    {
        $json = $this->getToJson('/api/v1/me', [
            'token' => 'failedtoken'
        ]);

        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @test */
    public function error_when_token_is_absent()
    {
        $json = $this->getToJson('/api/v1/me', [
            'token' => 'bad.token.here'
        ]);

        $this->assertError($json, 500, '/^'.TOKEN_ABSENT.'$/');
    }

    /** @test */
    public function error_when_user_not_found()
    {
        $user = \App\User::create([
            'name' => 'test api me',
            'email' => 'me@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postToJson('/api/v1/login', [
            'email' => 'me@test.com',
            'password' => 'password'
        ]);

        $user->delete();

        $json = $this->getToJson('/api/v1/me', [
            'token' => $json['token']
        ]);

        $this->assertError($json, 400, '/^'.USER_NOT_FOUND.'$/');
    }
}
