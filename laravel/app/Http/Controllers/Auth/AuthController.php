<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Member;
use Validator;
use App\UserCalendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'api_token' => str_random(60),
        ]);
    }

//    /**
//     * override the method on Illuminate\Foundation\Auth\RegistersUsers
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @return \Illuminate\Http\Response
//     */
//    public function register(Request $request)
//    {
//        $validator = $this->validator($request->all());
//
//        if ($validator->fails()) {
//            $this->throwValidationException(
//                $request, $validator
//            );
//        }
//
//        $newUser = $this->create($request->all());
//
//        Auth::guard($this->getGuard())->login($newUser);
//
//        //return redirect($this->redirectPath());
//        return $this->sendAuthenticatedJsonResponse($user);
//    }

    /**
     * authenticated
     *
     * @param mixed $request
     * @param mixed $user
     * @access protected
     * @return void
     */
    protected function authenticated($request, $user)
    {
        if (($request->ajax() && ! $request->pjax()) || $request->wantsJson()) {
            return $this->sendAuthenticatedJsonResponse($user);
        }

        return redirect()->intended($this->redirectPath());
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        if (($request->ajax() && ! $request->pjax()) || $request->wantsJson()) {
            return $this->sendFailedLoginJsonResponse($request);
        }

        return parent::sendFailedLoginResponse($request);
    }

    protected function sendAuthenticatedJsonResponse($user)
    {
        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'message' => 'success login',
            'user' => $user
        ], 200);
    }

    protected function sendFailedLoginJsonResponse(Request $request)
    {
        return response()->json([
            'status'  => 'Unauthorixed',
            'code'    => 401,
            'message' => $this->getFailedLoginMessage()
        ], 401);
    }

}
