<?php

use Nuts\Api\Test\ApiTestTrait;

class JwtAuthControllerTest extends TestCase
{
    use ApiTestTrait;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(\App\User::class)
            ->create(['password' => bcrypt('password')]);

        $loginJson = $this->postToJson('/api/v1/login', [
            'email' => $this->user->email,
            'password' => 'password'
        ]);
    }

    public function tearDown()
    {
//        m::close();
    }

    private $siteName = 'Nuts Family Calendar';

    /** @test */
    public function routing_to_toppage()
    {
        $this->visit('/')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_login()
    {
        $this->visit('/login')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_register()
    {
        $this->visit('/register')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_password_email()
    {
        $this->visit('/password/email')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_password_reset_token()
    {
        $this->visit('/password/reset/token')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function get_access_to_password_reset()
    {
        $json = $this->getToJson('/password/reset');
        $message = '/^'.TOKEN_COULD_NOT_BE_PARSED.'$/';
        $this->assertError($json, 400, $message);
    }

    /** @test */
    public function routing_to_user_settings_general()
    {
        $this->visit('/me/settings/general')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_user_settings_theme()
    {
        $this->visit('/me/settings/theme')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_user_settings_change_password()
    {
        $this->visit('/me/settings/password')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_calendar_dashboard()
    {
        $this->visit('/calendar')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_calendar_view()
    {
        $this->visit('/calendar/view/xxx')
            ->see('<div id="app"></div>');
    }

    /** @test */
    public function routing_to_calendar_settings()
    {
        $this->visit('/calendar/settings/xxx')
            ->see('<div id="app"></div>');
    }

}
