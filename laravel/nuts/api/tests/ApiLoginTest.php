<?php

use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Test\Assertions\AssertLogin;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiLoginTest extends TestCase
{
    use ApiTestTrait, AssertLogin;
    use DatabaseTransactions;
}
