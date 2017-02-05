<?php

use Nuts\Api\Test\ApiTestTrait;
use Nuts\Api\Test\Assertions\AssertPasswordEmail;
use Nuts\Api\Test\Assertions\AssertPasswordReset;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiPasswordTest extends TestCase
{
    use ApiTestTrait, AssertPasswordEmail, AssertPasswordReset;
    use DatabaseTransactions;
}
