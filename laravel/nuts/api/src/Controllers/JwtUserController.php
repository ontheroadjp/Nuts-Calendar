<?php

namespace Nuts\Api\Controllers;

use Hash;
use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Nuts\Api\Requests\UserPasswordChangeRequest;
use Nuts\Api\Requests\UserAccountSettingsRequest;

class JwtUserController extends BaseController
{
    use JwtAuthJsonResponse;

//    protected function getToken()
//    {
//        if (! $token = JWTAuth::getToken()) {
//            return $this->sendTokenCouldNotBeParsed();
//        }
//
//        return $token;
//    }

    /**
     * Return User with Jwt token
     *
     * @param \Illuminate\Http\Request $request
     * @access public
     * @return string JSON encoded return value
     */
    public function getMe(Request $request)
    {
        if (! $token = JWTAuth::getToken()) {
            return $this->sendTokenCouldNotBeParsed();
        }

        return $this->sendUserWithJwtToken($token->get());
    }

    /**
     * getSettings
     *
     * @access public
     * @return string HTML
     */
    public function getSettings()
    {
        return $this->showUserSettingsForm();
    }

    /**
     * Show user settings form
     *
     * @access protected
     * @return string HTML
     */
    protected function showUserSettingsForm()
    {
        return view('nutsapi::vue');
    }

    /**
     * putSettings
     *
     * @param \Nuts\Api\UserAccountSettingsRequest $request
     * @access protected
     * @return string JSON encoded return value
     */
    protected function putSettings(UserAccountSettingsRequest $request)
    {
        if (! $token = JWTAuth::getToken()) {
            return $this->sendTokenCouldNotBeParsed();
        }

        $id = (JWTAuth::authenticate($token))->id;
        $user = \App\User::find($id);

        $user->name = $request->name;
        $user->save();

        return $this->sendUserWithJwtToken($token->get());
    }

    /**
     * putPasswordChange
     *
     * @param UserPasswordChangeRequest $request
     * @access protected
     * @return void
     */
    protected function putPasswordChange(UserPasswordChangeRequest $request)
    {
        if (! $token = JWTAuth::getToken()) {
            return $this->sendTokenCouldNotBeParsed();
        }

//        $id = (JWTAuth::authenticate($token))->id;
//        $user = \App\User::find($id);

        // temp
        $user = JWTAuth::authenticate($token);

        if(! Hash::check($request->old_password, $user->password)) {
            return $this->sendValidationError('old password does not match');
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return $this->sendUserWithJwtToken($token);
    }
}
