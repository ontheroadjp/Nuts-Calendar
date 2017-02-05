<?php

use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Test\Assertions\AssertRegister;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiRegisterTest extends TestCase
{
    use ApiTestTrait, AssertRegister;
    use DatabaseTransactions;
}
