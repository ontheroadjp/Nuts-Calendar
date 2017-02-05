<?php

use Nuts\Api\Responses\JsonResponse;

class JsonResponseTest extends TestCase
{
    use JsonResponse;

    protected function assertions($returnObject, $json, $status, $message, $code, $extra)
    {
        $this->assertInstanceOf('\Illuminate\Http\JsonResponse', $returnObject);

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);
        $this->assertArrayHasKey('bar', $json);
        $this->assertArrayHasKey('baz', $json);

        $this->assertContains($status, $json);
        $this->assertContains($code, $json);
        $this->assertContains($message, $json);
        $this->assertContains('123', $json);
        $this->assertContains('456', $json);
    }

    /** @test */
    public function sendSuccessJson_should_return_the_json_with_200_and_extra_values()
    {
        $message = 'sendSuccessJson with extra values';
        $extra = [ 'bar' => '123', 'baz' => '456' ];

        $return = $this->sendSuccessJson($message, $extra);
        $json = $return->getData(true);

        $this->assertions($return, $json, 'success', $message, 200, $extra);
    }

    /** @test */
    public function sendErrorJson_should_return_the_json_with_400_and_extra_values()
    {
        $message = 'sendErrorJson with extra values';
        $code = 400;
        $extra = [ 'bar' => '123', 'baz' => '456' ];

        $return = $this->sendErrorJson($message, $code, $extra);
        $json = $return->getData(true);

        $this->assertions($return, $json, 'error', $message, $code, $extra);
    }

    /** @test */
    public function sendJson_should_return_the_json()
    {
        $message = 'sendJson with extra values';
        $code = 404;
        $extra = [ 'bar' => '123', 'baz' => '456' ];

        $return = $this->sendErrorJson($message, $code, $extra);
        $json = $return->getData(true);

        $this->assertions($return, $json, 'error', $message, $code, $extra);
    }
}
