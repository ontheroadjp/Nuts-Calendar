<?php

namespace Nuts\Api\Test\Assertions;

trait AssertRoutings
{
    private $siteName = 'Nuts Family Calendar';

    /** @test */
    public function routing_to_toppage()
    {
        $this->visit('/')
            //->see('<title>'.$siteName.'</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_dashboard()
    {
        $this->visit('/dashboard')
            //->see('<title>'.$siteName.'</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_login()
    {
        $this->visit('/login')
            //->see('<title>Login</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_register()
    {
        $this->visit('/register')
            //->see('<title>Register</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_password_email()
    {
        $this->visit('/password/email')
            //->see('<title>Password Reset</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_password_reset_token()
    {
        $this->visit('/password/reset/token')
            //->see('<title>Password Reset</title>')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function get_access_to_password_reset()
    {
        $json = $this->getHttpJsonResponseAsArray('/password/reset');
        $message = '/^'.TOKEN_COULD_NOT_BE_PARSED.'$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function routing_to_user_settings()
    {
        $this->visit('/me/settings')
            //->see('<title>Password Reset</title>')
            ->see('<div id="app"></div>');
    }
}
