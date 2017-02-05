<?php

use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Test\Assertions\AssertMe;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiMeTest extends TestCase
{
    use ApiTestTrait, AssertMe;
    use DatabaseTransactions;
}
