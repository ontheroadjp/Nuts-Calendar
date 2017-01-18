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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/event', function () {
    return view('event');
});

Route::get('/calendar', function () {
    return view('calendar');
});

Route::group(['prefix' => 'api'], function () {
    Route::get('calendar/{year}/{month}', 'CalendarController@index' );

    Route::get('member', 'MembersController@index' );
//    Route::get('member/tasks', 'MembersController@indexWith' );
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
});

Route::auth();

Route::get('/home', 'HomeController@index');
