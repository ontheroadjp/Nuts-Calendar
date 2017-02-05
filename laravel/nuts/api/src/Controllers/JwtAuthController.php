<?php

/*
 * This file is part of laravel-api.
 *
 * (c) Hideaki Ishihara <dev@nutsllc.jp>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nuts\Api\Controllers;

use JWTAuth;
use Validator;
//use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class JwtAuthController extends BaseController
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;
    use JwtAuthJsonResponse;

    // -----------------------------------------------------------------
    // Login
    // -----------------------------------------------------------------

    /**
     * Show the login form page
     *
     * @access public
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function showLoginForm()
    {
        return view('nutsapi::vue');
    }

    /**
     * Validate request parameters
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access protected
     * @return void|string
     */
    protected function validateLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            $this->loginUsername() => 'required',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $validator->messages();
        }
    }

    /**
     * Authenticate from email and password
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access public
     * @return string JSON encoded return value
     */
    public function login(Request $request)
    {
        if($errorMessages = $this->validateLogin($request))  {
            return $this->sendValidationError($errorMessages);
        }

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->getCredentials($request);
        try {
            $token = JWTAuth::attempt($credentials);
            if ($token) {
                return $this->sendLoginSuccessResponse($token);
            }
        } catch (JWTException $e) {
            return $this->sendCouldNotCreateToken($e);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login. Of course, when this user surpasses their maximum number of attempts
        // they will get locked out.
        if ($throttles && ! $lockedOut) {
            $this->incrementLoginAttempts($request);
        }

        return $this->sendInvalidCredentials();
    }

    /**
     * Send JSON contained current user info and JWT token
     *
     * @param string $token
     * @access protected
     * @return string JSON encoded return value
     */
    protected function sendLoginSuccessResponse(string $token)
    {
        return $this->sendUserWithJwtToken($token);
    }

    /**
     * Redirect the user after determining they are locked out.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendLockoutResponse(Request $request)
    {
        //var_dump('send lockout response');
        $seconds = $this->secondsRemainingOnLockout($request);
        $message = $this->getLockoutErrorMessage($seconds);
        return $this->sendErrorJson($message, 429);
    }

    // -----------------------------------------------------------------
    // Registration
    // -----------------------------------------------------------------

    /**
     * Show the registration form page
     *
     * @access public
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function showRegistrationForm()
    {
        return view('nutsapi::vue');
    }

    /**
     * Validate request parameters for user registration
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access protected
     * @return void|string
     */
    protected function validateRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $validator->messages();
        }
    }

    /**
     * regist new user
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access public
     * @return string JSON encoded return value
     */
    public function register(Request $request)
    {
        if($errorMessages = $this->validateRegister($request) ) {
            return $this->sendValidationError($errorMessages);
        }

        try {
            $user = \App\User::create($request->all());
        } catch(\PDOException $e) {
            return $this->failedRegister($e);
        }

        $token = JWTAuth::fromUser($user);
        return $this->successRegister($token);
    }

    /**
     * Send JSON contained current user info and JWT token
     *
     * @param string $token JWT token
     * @access protected
     * @return string JSON encoded return value
     */
    protected function successRegister(string $token)
    {
        return $this->sendUserWithJwtToken($token);
    }

    /**
     * Send JSON contained error infomation
     *
     * @param \PDOException $e
     * @access protected
     * @return string JSON encoded return value
     */
    protected function failedRegister(\PDOException $e)
    {
        $message = $e->getMessage();
        return $this->sendErrorJson($message, 500);
    }
}
