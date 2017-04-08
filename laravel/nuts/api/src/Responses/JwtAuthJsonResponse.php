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
use Nuts\Api\Responses\JsonResponse;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

trait JwtAuthJsonResponse
{
    use JsonResponse;

    /**
     * Send the JSON response with the user object and jwt token string
     *
     * @param string $token jwt token
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendUserWithJwtToken(String $token)
    {
        try {
            $user = JWTAuth::authenticate($token);
        } catch (TokenExpiredException $e) {
            return $this->sendUserWithRefreshedJwtToken($token);
        } catch (TokenInvalidException $e) {
            return $this->sendInvalidToken($e);
        } catch (JWTException $e) {
            return $this->sendTokenAbsent($e);
        }

        if (! $user) {
            return $this->sendUserNotFound();
        }

        return $this->sendSuccessJson(SEND_USER_WITH_JWT_TOKEN, [
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Send the Json response with the user object and refreshed token string
     *
     * @param String $oldToken jwt token which will be refreshed
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendUserWithRefreshedJwtToken(String $oldToken)
    {
        $oldTokenObj = new \Tymon\JWTAuth\Token($oldToken);

        try {
            $refreshed = JWTAuth::refresh($oldTokenObj);
            $user = JWTAuth::setToken($refreshed)->toUser();
        } catch (JWTException $e) {
            return $this->sendTokenExpiredAndUnrefreshable($e);
        }

        return $this->sendSuccessJson(SEND_USER_WITH_REFRESHED_JWT_TOKEN, [
            'user' => $user,
            'token' => $refreshed
        ]);
    }

    /**
     * Send the JSON response w/(code: 500, message: could not create token)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendCouldNotCreateToken(JWTException $e = null)
    {
        return $this->sendErrorJson(COULD_NOT_CREATE_TOKEN, 500);
    }

    /**
     * Send the JSON response w/(code: 401, message: invalid credentials)
     *
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendInvalidCredentials()
    {
        return $this->sendErrorJson(INVALID_CREDENTIALS, 401);
    }

    /**
     * Send the JSON response w/(code: 400, message: token invalid)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendInvalidToken(TokenInvalidException $e = null)
    {
        return $this->sendErrorJson(TOKEN_INVALID, 400);
    }

    /**
     * Send the JSON response w/(code: 500, message: token absent)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendTokenAbsent(JWTException $e = null)
    {
        return $this->sendErrorJson(TOKEN_ABSENT, 500);
    }

    /**
     * Send the JSON response w/(code: 500, message: token expired and unrefreshable)
     *
     * @param \Tymon\JWTAuth\Exceptions\JWTException $e
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendTokenExpiredAndUnrefreshable(JWTException $e = null)
    {
        return $this->sendErrorJson(TOKEN_EXPIRED_AND_UNREFRESHABLE, 500);
    }

    /**
     * Send the JSON response w/(code: 400, message: token not provided)
     *
     * @access protected
     * @return void
     */
    protected function sendTokenNotProvided()
    {
        return $this->sendErrorJson(TOKEN_NOT_PROVIDED, 400);
    }

    /**
     * Send the JSON response w/(code: 500, message: token could not be parsed)
     *
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendTokenCouldNotBeParsed()
    {
        return $this->sendErrorJson(TOKEN_COULD_NOT_BE_PARSED, 400);
    }

    /**
     * Send the JSON response w/(code: 404, message: user not found)
     *
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendUserNotFound()
    {
        return $this->sendErrorJson(USER_NOT_FOUND, 404);
    }

    /**
     * Send the JSON response w/(code: 400)
     *
     * @param string $message The message contained in return value
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendValidationError(string $message = '')
    {
        if( $message == '') $message = VALIDATION_ERROR;
        return $this->sendErrorJson($message, 400);
    }
}
