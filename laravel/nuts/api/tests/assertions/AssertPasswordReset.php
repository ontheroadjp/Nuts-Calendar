<?php

namespace Nuts\Api\Test\Assertions;

use Password;

trait AssertPasswordReset
{
    // these abstract methods are implemented in Nuts\Api\Test\ApiTestTreat.php
    abstract protected function assertSuccess($json, $message);
    abstract protected function assertError($json, $code, $message);

    protected $user = null;
    protected $password = 'password';
    protected $token = '';
    protected $newPassword = 'newpassword';

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
            'password' => bcrypt($this->password)
        ]);

        $this->token = Password::createToken($this->user);
    }

    /** @test */
    public function success_reset_password()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/reset', [
            'email' => $this->user['email'],
            'password' => $this->newPassword,
            'password_confirmation' => $this->newPassword,
            'token' => $this->token
        ]);

        $this->assertSuccess($json, '/^password reset successfully$/');
    }

    /** @test */
    public function validation_error_when_post_invalid_email()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/reset', [
            'email' => 'invalidemail@test.com',
            'password' => $this->newPassword,
            'password_confirmation' => $this->newPassword,
            'token' => $this->token
        ]);

        $this->assertError($json, 500, '/could not reset password/');
    }

    /** @test */
    public function validation_error_when_post_password_min_6()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/reset', [
            'email' => 'reset@test.com',
            'password' => '1234',
            'password_confirmation' => '1234',
            'token' => $this->token
        ]);

        $message = '/^{"password":\["The password must be at least 6 characters."\]}/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function validation_error_when_post_password_confirmation_does_not_match()
    {
        is_null($this->user) ? $this->initAssertPasswordReset() : '';

        $json = $this->postHttpJsonResponseAsArray('/api/v1/password/reset', [
            'email' => 'reset@test.com',
            'password' => 'newpassword',
            'password_confirmation' => 'xxx',
            'token' => $this->token
        ]);

        $message = '/^{"password":\["The password confirmation does not match."\]}/';
        $this->assertError($json, 400, $message);
    }

}
