<?php

namespace Nuts\Api\Test;

trait ApiTestTrait
{
    /**
     * Send HTTP GET Request to API endpoint and return JSON response as array
     *
     * @param string $uri
     * @param array $parameters
     * @access protected
     * @return array
     */
    protected function getHttpJsonResponseAsArray(string $uri = '/', array $parameters = [])
    {
        $paramsString = '';
        $i = 0;
        foreach( $parameters as $key => $val) {
            if($i != 0) { $paramsString .= '&'; }
            $paramsString .= $key.'='.$val;
            $i++;
        }
        $res = $this->get($uri.'?'.$paramsString)->response;
        return json_decode($res->getContent(),true);
    }

    /**
     * Send HTTP POST Request to API endpoint and return JSON response as array
     *
     * @param string $uri
     * @param array $parameters
     * @access protected
     * @return array
     */
    protected function postHttpJsonResponseAsArray($uri = '/', $parameters)
    {
        $res = $this->post($uri, $parameters)->response;
        return json_decode($res->getContent(),true);
    }

    protected function assertSendUserWithJwtToken($json, $isRefreshedToken = false)
    {
        $message = SEND_USER_WITH_JWT_TOKEN;
        if($isRefreshedToken) $message = SEND_USER_WITH_REFRESHED_JWT_TOKEN;

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);

        $this->assertContains('success', $json);
        $this->assertContains('200', $json);
        $this->assertContains($message, $json);

        $this->assertArrayHasKey('user', $json);
        $this->assertArrayHasKey('id', $json['user']);
        $this->assertArrayHasKey('name', $json['user']);
        $this->assertArrayHasKey('email', $json['user']);
        $this->assertArrayHasKey('created_at', $json['user']);
        $this->assertArrayHasKey('updated_at', $json['user']);

        $this->assertArrayHasKey('token', $json);
    }

    protected function assertSuccess($json, $message)
    {
        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);

        $this->assertContains('success', $json);
        $this->assertContains('200', $json);
        $this->assertRegExp($message, $json['message']);
    }

    protected function assertError($json, $code, $message)
    {
        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);

        $this->assertContains('error',$json);
        $this->assertContains($code, $json);
        $this->assertRegExp($message, $json['message']);
    }
}
