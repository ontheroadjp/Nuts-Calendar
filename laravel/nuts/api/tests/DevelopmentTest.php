<?php

use Nuts\Api\Test\ApiTestTrait;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DevelopmentTest extends TestCase
{
    use ApiTestTrait;
    use DatabaseTransactions;

    /** @test */
    public function working_well()
    {
        $user = \App\User::create([
            'name' => 'development test',
            'email' => 'development@test.com',
            'password' => bcrypt('password')
        ]);

        $json = $this->postHttpJsonResponseAsArray('/api/v1/login', [
            'email' => 'development@test.com',
            'password' => 'password'
        ]);

        $this->assertArrayHasKey('version', $json);
        $this->assertArrayHasKey('processTime', $json);
    }
}
