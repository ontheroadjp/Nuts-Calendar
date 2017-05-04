<?php

//Route::auth();

//Route::get('/', 'PagesController@index');
//Route::get('/dashboard', 'PagesController@index');
//Route::get('/calendar/{userCalendarId}', 'PagesController@index');
//Route::get('/user/settings', 'PagesController@index');

Route::group( ['prefix' => 'api/v1'], function() {
    Route::group( [
//            'middleware' => ['jwt.auth']
            'middleware' => ['nuts.api.jwtauth']
        ], function () {

            // user calendar
            Route::get('usercalendar', 'UserCalendarsController@index');
            Route::get('calendar/{userCalendarId}/{year}/{month}', 'CalendarController@index' );

            // members
            Route::get('member', 'MembersController@index' );
            Route::get('member/{id}', 'MembersController@show' );
//            Route::post('member', 'MembersController@store' );
//            Route::patch('member/{id}', 'MembersController@update' );
            Route::delete('member/{id}', 'MembersController@destroy' );

            // items
            Route::get('item', 'EventsController@index' );
            Route::get('item/{id}', 'EventsController@show' );
            Route::post('item', 'EventsController@store' );
            Route::put('item/{id}', 'EventsController@update' ); // modify
            Route::delete('item/{id}', 'EventsController@destroy' );
            Route::get('item/{userCalendarId}/{year}/{month}', 'EventsController@indexRange' );
        }
    );
});


