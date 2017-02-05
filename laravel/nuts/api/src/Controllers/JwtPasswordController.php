<?php

namespace Nuts\Api\Controllers;

use Validator;
use Password;
use Illuminate\Http\Request;
//use Nuts\Api\Responses\JsonResponse;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class JwtPasswordController extends Controller
{
    use ResetsPasswords, JwtAuthJsonResponse;

    // --------------------------------------------------
    // email
    // --------------------------------------------------

    public function showLinkRequestForm()
    {
        return view('nutsapi::vue');
    }

    /**
     * Validate the request of sending reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void|json
     */
    protected function validateSendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return 'don\'t call throwValidationException()';
            //$this->throwValidationException($request, $validator);
        }
    }

    protected function getSendResetLinkEmailSuccessResponse($response)
    {
        $message = "send reset link email successfully";
        return $this->sendSuccessJson($message);
    }

    protected function getSendResetLinkEmailFailureResponse($response)
    {
        $message = "could not send the reset link email";
        return $this->sendErrorJson($message, 500);
    }

    // --------------------------------------------------
    // reset
    // --------------------------------------------------

    public function showResetForm($request, $token)
    {
        if(is_null($token)) {
            return $this->sendErrorJson(TOKEN_COULD_NOT_BE_PARSED, 400);
        }
        return view('nutsapi::vue');
    }

    /**
     * Validate request parameters
     *
     * @param \Illuminate\Http\RequestRequest $request
     * @access protected
     * @return void|string
     */
    protected function validatePasswordReset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return $validator->messages();
        }
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reset(Request $request)
    {
        if($errorMessages = $this->validatePasswordReset($request))  {
            return $this->sendValidationError($errorMessages);
        }

        $credentials = $this->getResetCredentials($request);
        $broker = $this->getBroker();
        $response = Password::broker($broker)->reset($credentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });
        switch ($response) {
            case Password::PASSWORD_RESET:
                return $this->getResetSuccessResponse($response);
            default:
                return $this->getResetFailureResponse($request, $response);
        }
    }


    protected function getResetSuccessResponse($response)
    {
        $message = "password reset successfully";
        return $this->sendSuccessJson($message);
    }

    protected function getResetFailureResponse(Request $request, $response)
    {
        $message = "could not reset password";
        return $this->sendErrorJson($message, 500);
    }
}
