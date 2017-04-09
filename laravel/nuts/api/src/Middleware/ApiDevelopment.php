<?php

namespace Nuts\Api\Middleware;

use Closure;

class ApiDevelopment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $before = microtime(true);
        $response = $next($request);
        $passtime = microtime(true) - $before;

        $data = json_decode($response->content(), true);

        if(is_array($data)) {
            $data += [ 'version' => 'v1' ];
            $data += [ 'processTime' => $passtime ];
        }

        return $response->setContent(json_encode($data));
    }
}
