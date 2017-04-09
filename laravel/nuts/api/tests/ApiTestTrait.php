<?php

use Illuminate\Http\RedirectResponse;

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
    protected function getToJson(string $uri = '/', array $parameters = [])
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
    protected function postToJson($uri = '/', $parameters)
    {
        $servers = ['X-Requested-With' => 'XMLHttpRequest'];
        $json = $this->post($uri, $parameters, $servers)->response;
        return json_decode($json->getContent(), true);
    }

    protected function assertSendUserWithJwtToken($json, $isRefreshedToken = false)
    {
        $message = SEND_USER_WITH_JWT_TOKEN;
        if($isRefreshedToken) $message = SEND_USER_WITH_REFRESHED_JWT_TOKEN;

        $code = $isRefreshedToken ? '202' : '200';

        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);
        $this->assertArrayHasKey('user', $json);
        $this->assertArrayHasKey('name', $json['user']);
        $this->assertArrayHasKey('email', $json['user']);
        $this->assertArrayHasKey('token', $json);

        $this->assertContains('success', $json);
        $this->assertContains($code, $json);
        $this->assertContains($message, $json);

        $this->assertInternalType('string', $json['status']);
        $this->assertInternalType('int', $json['code']);
        $this->assertInternalType('string', $json['message']);
        $this->assertInternalType('array', $json['user']);
        $this->assertInternalType('string', $json['user']['name']);
        $this->assertInternalType('string', $json['user']['email']);
        $this->assertInternalType('string', $json['token']);
    }

    protected function assertSuccess($json, $code, $message)
    {
        $this->assertArrayHasKey('status', $json);
        $this->assertArrayHasKey('code', $json);
        $this->assertArrayHasKey('message', $json);

        $this->assertContains('success', $json);
        $this->assertEquals(2, floor($json['code'] / 100));
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
