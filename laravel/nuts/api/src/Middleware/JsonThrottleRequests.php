<?php

namespace Nuts\Api\Middleware;

use Nuts\Api\Responses\JsonResponse;
use Illuminate\Routing\Middleware\ThrottleRequests;

class JsonThrottleRequests extends ThrottleRequests
{
    use JsonResponse;

    /**
     * Create a 'too many attempts' JSON response.
     *
     * @param  string  $key
     * @param  int  $maxAttempts
     * @return string JSON encoded return value
     */
    protected function buildResponse($key, $maxAttempts)
    {
        $retryAfter['in_sec'] = $this->limiter->availableIn($key);
        $retryAfter['minuts'] = (int) ($retryAfter['in_sec'] / 60);
        $retryAfter['secounds'] = (int) ($retryAfter['in_sec'] - ($retryAfter['minuts'] * 60));

        //$remainingAttempts = $this->calculateRemainingAttempts(
        //    $key, $maxAttempts, $retryAfter['in_sec']
        //);

        $message = TOO_MANY_LOGIN_ATTEMPTS;

        return $this->sendErrorJson($message, 429, [
            'retryAfter' => [
                'in_sec' => $retryAfter['in_sec'],
                'minuts' => $retryAfter['minuts'],
                'secound' => $retryAfter['secounds']
            ]
        ]);
    }
}
