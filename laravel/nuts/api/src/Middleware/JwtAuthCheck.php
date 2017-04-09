<?php

namespace Nuts\Api\Middleware;

use Tymon\JWTAuth\Token;
use Tymon\JWTAuth\Exceptions\JWTException;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Tymon\JWTAuth\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class JwtAuthCheck extends BaseMiddleware
{
    use JwtAuthJsonResponse;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        if (! $token = $this->auth->setRequest($request)->getToken()) {
            $json = $this->sendInvalidToken()->getData(true);
            return $this->returnResponse($json);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            $json = $this->sendUserWithRefreshedJwtToken($token)->getData(true);
            return $this->returnResponse($json);
        } catch (JWTException $e) {
            $json = $this->sendTokenAbsent($e)->getData(true);
            return $this->returnResponse($json);
        }

        if (! $user) {
            $json = $this->sendUserNotFound()->getData(true);
            return $this->returnResponse($json);
        }

//        $user = $this->getAuthenticatedUser($token);
//
//        if($user instanceOf \Illuminate\Http\JsonResponse ) {
//            $this->returnResponse($user->getData(true));
//        }

        return $next($request);
    }

    protected function returnResponse($json)
    {
        return $this->response->json($json, $json['code']);
    }
}
