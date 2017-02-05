<?php

namespace Nuts\Api\Controllers;

use JWTAuth;
//use App\Http\Requests;
use Illuminate\Http\Request;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Illuminate\Routing\Controller as BaseController;

class JwtUserController extends BaseController
{
    use JwtAuthJsonResponse;

    /**
     * Return User with Jwt token
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access public
     * @return string JSON encoded return value
     */
    public function getMe(Request $request)
    {
        if (! $token = JWTAuth::getToken()) {
            return $this->sendInvalidToken();
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
     * showUserSettingsForm
     *
     * @access protected
     * @return string HTML
     */
    protected function showUserSettingsForm()
    {
        return view('nutsapi::vue');
    }

//    protected function getUser(string $token)
//    {
//        try {
//            if (! $user = JWTAuth::authenticate($token)) {
//                return $this->sendUserNotFound();
//            }
//        } catch (TokenExpiredException $e) {
//            return $this->sendUserWithRefreshedJwtToken($token);
//        } catch (TokenInvalidException $e) {
//            return $this->sendInvalidToken($e);
//        } catch (JWTException $e) {
//            return $this->sendTokenAbsent($e);
//        }
//        return $user;
//    }

    /**
     * putSettings
     *
     * @access protected
     * @return string JSON encoded return value
     */
    protected function putSettings(Request $request)
    {
//        if (! $token = JWTAuth::getToken()) {
//            return $this->sendTokenCouldNotBeParsed();
//        }
//
//        $id = (JWTAuth::authenticate($token))->id;

        $id = ($request->user)['id'];
        $user = \App\User::find($id);

        $user->name = $request->name;
        $user->save();

        return [
            'id' => $id,
            'token' => $token,
            'new_name' => $request->name,
            'user' => $user
        ];
    }
}

