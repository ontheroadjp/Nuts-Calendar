<?php

namespace Nuts\Api\Middleware;

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
            return $this->response->json(
                $this->sendInvalidToken()->getData(true), 400
            );
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return $this->response->json(
                $this->sendUserWithRefreshedJwtToken($token)->getData(true), 401
            );
        } catch (TokenInvalidException $e) {
            return $this->response->json(
                $this->sendInvalidToken($e)->getData(true), 400
            );
        } catch (JWTException $e) {
            return $this->response->json(
                $this->sendTokenAbsent($e)->getData(true), 500
            );
        }

        if (! $user) {
            return $this->response->json(
                $this->sendUserNotFound()->getData(true), 404
            );
        }

        //$this->events->fire('tymon.jwt.valid', $user);
        //$request->merge(['token' => $token]);
        //$request->merge(['user' => $user]);
        return $next($request);
    }
}
