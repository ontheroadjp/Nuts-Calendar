<?php

use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiPasswordEmailTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    /** @test */
    public function success_post_valid_email()
    {
        \App\User::create([
            'name' => 'checkauth test user',
            'email' => 'sendemail@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postToJson('/api/v1/password/email', [
            'email' => 'sendemail@test.com',
        ]);

        $message = '/^'.SEND_RESET_LINK_EMAIL_SUCCESSFULLY.'$/';
        $this->assertSuccess($json, 200, $message);
    }

    /** @test */
    public function error_when_post_email_does_not_stored_in_DB()
    {
        $json = $this->postToJson('/api/v1/password/email', [
            'email' => 'notStoredEmailAddress@test.com',
        ]);
        $message = '/^'.COULD_NOT_SEND_THE_RESET_LINK_EMAIL.'$/';
        $this->assertError($json, 500, $message);
    }


    /** @test */
    public function error_when_post_with_invalid_email_address()
    {
        $json = $this->postToJson('/api/v1/password/email', [
            'email' => 'invalidEmailAddress',
        ]);
        $message = '/^'.COULD_NOT_SEND_THE_RESET_LINK_EMAIL.'$/';
        $this->assertError($json, 500, $message);
    }
}
