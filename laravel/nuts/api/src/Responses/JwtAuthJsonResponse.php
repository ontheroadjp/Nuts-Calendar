<?php

/*
 * This file is part of jwt-auth-api.
 *
 * (c) Hideaki Ishihara <hishihara@nutsllc.jp>
 *
 * For the full copyright and license information, please read the LICENSE
 * file that was distributed with this source code.
 */

namespace Nuts\Api\Responses;

use JWTAuth;
use Tymon\JWTAuth\Token;
use InvalidArgumentException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

trait JwtAuthJsonResponse
{

    /**
     * Return authenticated user
     *
     * @param   string $token
     * @access  protected
     * @return  App\User|Illuminate\Http\JsonResponse
     */
    protected function getAuthenticatedUser($token)
    {
        try {
            $user = JWTAuth::authenticate($token);
        } catch (TokenExpiredException $e) {
            //return $this->sendUserWithRefreshedJwtToken(new Token($token));
            throw $e;
        } catch (TokenInvalidException $e) {
            return $this->sendInvalidToken($e);
        } catch (JWTException $e) {
            return $this->sendTokenAbsent($e);
        }

        if (! $user) {
            return $this->sendUserNotFound();
        }

        return $user;
    }

    /**
     * Return refreshed token
     *
     * @param   string|Tymon\JWTAuth\Token $token
     * @access  protected
     * @return  string|Illuminate\Http\JsonResponse
     */
    protected function refreshToken($token)
    {
        if(is_string($token)) {
            $token = new Token($token);
        }

        try {
            $refreshedTokenString = JWTAuth::refresh($token);
        } catch (JWTException $e) {
            return $this->sendTokenUnrefreshable($e);
        }

        return $refreshedTokenString;
    }

    /**
     * Send the JSON response
     *
     * @param   int     $code HTTP status code
     * @param   string  $message
     * @param   array   $extra
     * @access  protected
     * @return  Illuminate\Http\JsonResponse
     *
     * @throws \InvalidArgumentException
     */
    protected function sendJson(int $code, string $message = '', array $extra = [])
    {
        if(!preg_match('/^([0-9]{3})$/', $code)) {
            throw new InvalidArgumentException('HTTP status code must be three digits');
        }

        if(floor((int)$code / 100) == '2') {
            $status = SUCCESS_STATUS;
            $message === '' ? $message = SUCCESS_MESSAGE : '';
        } else {
            $status = ERROR_STATUS;
            $message === '' ? $message = ERROR_MESSAGE : '';
        }

        $contents = [
            'status' => $status,
            'code' => $code,
            'message' => $message
        ];

        if($extra !== null) $contents = array_merge($contents, $extra);

        return response()->json($contents, $code);
    }

    /**
     * Send the JSON response with the user object and jwt token string
     *
     * @param string|Tymon\JWTAuth\Token $token jwt token
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendUserWithJwtToken($token)
    {
        if($token instanceof \Tymon\JWTAuth\Token) {
            $token = $token->get();
        }

        try {
            $user = $this->getAuthenticatedUser($token);
        } catch (TokenExpiredException $e) {
            return $this->sendUserWithRefreshedJwtToken($token);
        }

        if($user instanceof \Illuminate\Http\JsonResponse ) {
            return $user;
        }

        return $this->sendJson(200, SEND_USER_WITH_JWT_TOKEN, [
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Send the Json response with the user object and refreshed token string
     *
     * @param string|Tymon\JWTAuth\Token $oldToken jwt token which will be refreshed
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendUserWithRefreshedJwtToken($oldToken)
    {
        if(is_string($oldToken)) {
            $oldToken = new Token($oldToken);
        }

        $refreshedTokenString = $this->refreshToken($oldToken);
        if($refreshedTokenString instanceOf \Illuminate\Http\JsonResponse ) {
            return $refreshedTokenString;
        }

        try {
            $user = $this->getAuthenticatedUser($refreshedTokenString);
        } catch (JWTException $e) {
            return $this->sendTokenUnrefreshable($e);
        }

        if($user instanceOf \Illuminate\Http\JsonResponse ) {
            return $user;
        }

        return $this->sendJson(202, SEND_USER_WITH_REFRESHED_JWT_TOKEN, [
            'user' => $user,
            'token' => $refreshedTokenString
        ]);
    }

    /**
     * Send the JSON response w/(code: 500, message: could not create token)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendCouldNotCreateToken(JWTException $e = null)
    {
        return $this->sendJson(500, COULD_NOT_CREATE_TOKEN);
    }

    /**
     * Send the JSON response w/(code: 422, message: invalid credentials)
     *
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendInvalidCredentials()
    {
        return $this->sendJson(CODE_INVALID_CREDENTIALS, INVALID_CREDENTIALS);
    }

    /**
     * Send the JSON response w/(code: 400, message: token invalid)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendInvalidToken(TokenInvalidException $e = null)
    {
        return $this->sendJson(400, TOKEN_INVALID);
    }

    /**
     * Send the JSON response w/(code: 500, message: token absent)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendTokenAbsent(JWTException $e = null)
    {
        return $this->sendJson(500, TOKEN_ABSENT);
    }

    /**
     * Send the JSON response w/(code: 500, message: token unrefreshable)
     *
     * @param JWTException $e
     * @access protected
     * @return void
     */
    protected function sendTokenUnrefreshable(JWTException $e = null)
    {
        return $this->sendJson(500, TOKEN_UNREFRESHABLE);
    }

    /**
     * Send the JSON response w/(code: 400, message: token not provided)
     *
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendTokenNotProvided()
    {
        return $this->sendJson(400, TOKEN_NOT_PROVIDED);
    }

    /**
     * Send the JSON response w/(code: 400, message: token could not be parsed)
     *
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendTokenCouldNotBeParsed()
    {
        return $this->sendJson(400, TOKEN_COULD_NOT_BE_PARSED);
    }

    /**
     * Send the JSON response w/(code: 400, message: user not found)
     *
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendUserNotFound()
    {
        return $this->sendJson(400, USER_NOT_FOUND);
    }

    /**
     * Send the JSON response w/(code: 422)
     *
     * @param string $message The message contained in return value
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendValidationError(string $message = '')
    {
        if( $message == '') $message = VALIDATION_ERROR;
        return $this->sendJson(422, $message);
    }

    /**
     * Send the JSON response w/(code: 400)
     *
     * @param string $message The message contained in return value
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendUserCalendarNotFound(string $message = '') {
        return $this->sendJson(CODE_USER_CALENDAR_NOT_FOUND, USER_CALENDAR_NOT_FOUND);
    }

}
