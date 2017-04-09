<?php

use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiPasswordResetTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    protected $user;
    protected $token;

    /**
     * Initialize
     *
     * @access protected
     * @return void
     */
    protected function initAssertPasswordReset()
    {
        $this->user = \App\User::create([
            'name' => 'password reset test',
            'email' => 'reset@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postToJson('/api/v1/login', [
            'email' => 'reset@test.com',
            'password' => 'password',
        ]);

        $this->token = $json['token'];
    }

    /** @test */
    public function success_reset_password()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postToJson('/api/v1/password/reset', [
            'email' => 'reset@test.com',
            'password' => 'newPassword',
            'password_confirmation' => 'newPassword',
            'token' => Password::createToken($this->user)
        ]);

        $this->assertSuccess($json, 200, '/^password reset successfully$/');
    }

    /** @test */
    public function validation_error_when_post_invalid_email()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postToJson('/api/v1/password/reset', [
            'email' => 'invalidemail@test.com',
            'password' => 'newPassword',
            'password_confirmation' => 'newPassword',
            'token' => $this->token
        ]);

        $this->assertError($json, 500, '/could not reset password/');
    }

    /** @test */
    public function validation_error_when_post_password_min_6()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postToJson('/api/v1/password/reset', [
            'email' => 'reset@test.com',
            'password' => '1234',
            'password_confirmation' => '1234',
            'token' => $this->token
        ]);

        $message = '/^{"password":\["The password must be at least 6 characters."\]}/';
        $this->assertError($json, 422, $message);
    }

    /** @test */
    public function validation_error_when_post_password_confirmation_does_not_match()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postToJson('/api/v1/password/reset', [
            'email' => 'reset@test.com',
            'password' => 'newpassword',
            'password_confirmation' => 'xxx',
            'token' => $this->token
        ]);

        $message = '/^{"password":\["The password confirmation does not match."\]}/';
        $this->assertError($json, 422, $message);
    }
}
