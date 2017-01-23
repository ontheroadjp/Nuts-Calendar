<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

function getApiToken() {
    if( Auth::check() ) {
        //return Auth::guard('api')->user();
        return Auth::user()->api_token;
    }
}

Route::get('/', function () {
    $api_token = getApiToken();
    return view('welcome', compact('api_token'));
});

Route::get('/event', function () {
    return view('event');
});

Route::group(
    [
        'middleware' => ['auth']
    ], function () {
        Route::get('/calendar', function () {
            $api_token = getApiToken();
            return view('calendar', compact('api_token'));
        });
    }
);

// API Routings
Route::group(
    [
        'prefix' => 'v1',
        'middleware' => ['auth']
    ], function () {
        //Route::get('calendar/{year}/{month}', 'CalendarController@index' );
        Route::get('calendar/{userCalendarId}/{year}/{month}', 'CalendarController@index' );

        Route::get('member', 'MembersController@index' );
        Route::get('member/{id}', 'MembersController@show' );
        Route::post('member', 'MembersController@store' );
        Route::patch('member/{id}', 'MembersController@update' );
        Route::delete('member/{id}', 'MembersController@destroy' );

        Route::get('event', 'EventsController@index' );
        Route::get('event/{id}', 'EventsController@show' );
        Route::post('event', 'EventsController@store' );
        Route::patch('event/{id}', 'EventsController@update' );
        Route::delete('event/{id}', 'EventsController@destroy' );
        Route::get('event/{year}/{month}', 'EventsController@indexRange' );
    }
);

Route::auth();

Route::get('/home', 'HomeController@index');
