<?php

namespace Nuts\Api\Test\Assertions;

trait AssertPasswordEmail
{
    // these abstract methods are implemented in Nuts\Api\Test\ApiTestTreat.php
    abstract protected function assertSuccess($json, $message);
    abstract protected function assertError($json, $code, $message);

    /** @test */
    public function success_post_valid_email()
    {
        $passEmailUser = [
            'name' => 'checkauth test user',
            'email' => 'techeckauth@test.com',
            'password' => 'testtest'
        ];
        \App\User::create($passEmailUser);

        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/email', [
            'email' => $passEmailUser['email'],
        ]);
        $message = '/^'.SEND_RESET_LINK_EMAIL_SUCCESSFULLY.'$/';
        $this->assertSuccess($json, $message);
    }

    /** @test */
    public function error_when_post_email_does_not_stored_in_DB()
    {
        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/email', [
            'email' => 'notStoredEmailAddress@test.com',
        ]);
        $message = '/^'.COULD_NOT_SEND_THE_RESET_LINK_EMAIL.'$/';
        $this->assertError($json, 500, $message);
    }


    /** @test */
    public function error_when_post_with_invalid_email_address()
    {
        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/email', [
            'email' => 'invalidEmailAddress',
        ]);
        $message = '/^'.COULD_NOT_SEND_THE_RESET_LINK_EMAIL.'$/';
        $this->assertError($json, 500, $message);
    }

}
