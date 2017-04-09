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
use Nuts\Api\Requests\UserRegisterRequest;
use Nuts\Api\Requests\UserLoginRequest;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Routing\Controller as BaseController;
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
     * Authenticate from email and password
     *
     * @param \Nuts\Api\Requests\UserLoginRequest $request
     * @access public
     * @return string JSON encoded return value
     */
    public function login(UserLoginRequest $request)
    {
        $throttles = $this->isUsingThrottlesLoginsTrait();
        if ($throttles && $lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->getCredentials($request);
        try {
            $token = JWTAuth::attempt($credentials);
            if (! $token) {
                return $this->sendInvalidCredentials();
            }
        } catch (JWTException $e) {
            return $this->sendCouldNotCreateToken($e);
        }

        if ($throttles && ! $lockedOut) {
            $this->incrementLoginAttempts($request);
        }

        return $this->sendLoginSuccessResponse($token);
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
        $seconds = $this->secondsRemainingOnLockout($request);
        $message = $this->getLockoutErrorMessage($seconds);
        return $this->sendJson(429, $message);
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
     * regist new user
     *
     * @param \Nuts\Api\Requests\UserRegisterRequest $request
     * @access public
     * @return string JSON encoded return value
     */
    public function register(UserRegisterRequest $request)
    {
        //Auth::guard($this->getGuard())->login($this->create($request->all()));

        $data = $request->all();

        try {
            $user = \App\User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
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
        return $this->sendJson(500, $message);
    }
}
