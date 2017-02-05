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

trait JsonResponse
{
    /**
     * Return the JSON response with 200 HTTP status code in default
     *
     * @param string $message The message contained in return value with the key of 'message'
     * @param array $extra The key/value pairs will contain in return value
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendSuccessJson(string $message = 'success', array $extra = [])
    {
        return $this->sendJson($message, 200, $extra);
    }

    /**
     * Return the JSON response with 500 HTTP status code in default
     *
     * @param string $message The message contained in return value with message key
     * @param int $code HTTP status code contained in return value with the key of 'code'
     * @param array $extra The key/value pairs will contain in return value
     * @access protected
     * @return Illuminate\Http\JsonResponse
     */
    protected function sendErrorJson(string $message = 'error', $code = 500, array $extra = [])
    {
        return $this->sendJson($message, $code, $extra);
    }

    /**
     * Return the JSON response
     *
     * @param string $message The message contained in return value with message key
     * @param int $code HTTP status code contained in return value with the key of 'code'
     * @param array $extra The key/value pairs will contain in return value
     * @access private
     * @return Illuminate\Http\JsonResponse
     */
    private function sendJson(string $message = '', $code = 200, array $extra = [])
    {
        $code == 200 ? $status = SUCCESS_STATUS : $status = ERROR_STATUS;

        $contents = [
            'status' => $status,
            'code' => $code,
            'message' => $message
        ];

        if($extra !== null) $contents = array_merge($contents, $extra);

        return response()->json($contents, $code);
    }
}
