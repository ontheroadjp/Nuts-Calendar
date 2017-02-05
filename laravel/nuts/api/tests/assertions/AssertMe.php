<?php

namespace Nuts\Api\Test\Assertions;

trait AssertMe
{
    // these abstract methods are implemented in Nuts\Api\Test\ApiTestTreat.php
    abstract protected function postHttpJsonResponseAsArray($uri, $parameters);
    abstract protected function assertSendUserWithJwtToken($json, $newToken = true);
    abstract protected function assertError($json, $code, $message);

    /** @test */
    public function success_when_token_is_valid()
    {
        \App\User::create([
            'name' => 'checkauth test user',
            'email' => 'checkauth@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postHttpJsonResponseAsArray('/api/v1/login', [
            'email' => 'checkauth@test.com',
            'password' => 'password'
        ]);
        $json = $this->getHttpJsonResponseAsArray('/api/v1/me', [
            'token' => $json['token']
        ]);
        $this->assertSendUserWithJwtToken($json);
    }

    /** @test */
    public function error_when_no_token()
    {
        $json = $this->getHttpJsonResponseAsArray('/api/v1/me', [ ]);
        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @test */
    public function error_when_token_is_invalid()
    {
        $json = $this->getHttpJsonResponseAsArray('/api/v1/me', [
            'token' => 'failedtoken'
        ]);
        $this->assertError($json, 400, '/^'.TOKEN_INVALID.'$/');
    }

    /** @test */
    public function error_when_user_not_found()
    {
        $user = \App\User::create([
            'name' => 'not found error user',
            'email' => 'notfound@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postHttpJsonResponseAsArray('/api/v1/login', [
            'email' => 'notfound@test.com',
            'password' => 'password'
        ]);

        $user->delete();

        $json = $this->getHttpJsonResponseAsArray('/api/v1/me', [
            'token' => $json['token']
        ]);

        $this->assertError($json, 404, '/^'.USER_NOT_FOUND.'$/');
    }
}
