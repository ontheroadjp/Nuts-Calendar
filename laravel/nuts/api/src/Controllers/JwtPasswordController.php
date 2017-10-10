<?php

namespace Nuts\Api\Controllers;

use Validator;
use Password;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
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
     * (override of Illuminate\Foundation\Auth\ResetsPasswords trait)
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

    /**
     * Get the response for after the reset link has been successfully sent.
     * (override of Illuminate\Foundation\Auth\ResetsPasswords trait)
     *
     * @param  string  $response
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function getSendResetLinkEmailSuccessResponse($response)
    {
        $message = "send reset link email successfully";
        return $this->sendJson(200, $message);
    }

    /**
     * Get the response for after the reset link could not be sent.
     * (override of Illuminate\Foundation\Auth\ResetsPasswords trait)
     *
     * @param  string  $response
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function getSendResetLinkEmailFailureResponse($response)
    {
        $message = "could not send the reset link email";
        return $this->sendJson(500, $message);
    }

    // --------------------------------------------------
    // reset
    // --------------------------------------------------

    public function showResetForm($request, $token)
    {
        if(is_null($token)) {
            return $this->sendJson(400, TOKEN_COULD_NOT_BE_PARSED);
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
     * Get the Closure which is used to build the password reset email message.
     * (override of Illuminate\Foundation\Auth\ResetsPasswords trait)
     *
     * @return \Closure
     */
    protected function resetEmailBuilder()
    {
        return function (Message $message, $user, $token) {
            $message->subject($this->getEmailSubject());
            $message->getSwiftMessage()->getHeaders()->addTextHeader('X-Token', $token);
        };
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
        return $this->sendJson(200, $message);
    }

    protected function getResetFailureResponse(Request $request, $response)
    {
        $message = "could not reset password";
        return $this->sendJson(500, $message);
    }
}
