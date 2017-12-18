<?php

namespace Nuts\Api\Providers;

use Route;
use Illuminate\Support\ServiceProvider;

class JwtAuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerRoutes();
        $this->registerViews();
        $this->loadIncludes();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    protected function registerRoutes()
    {

        // -------------------------------------------------------------------
        // for Nuts\Calendar

        $this->app['router']->group([
            'namespace' => 'Nuts\Calendar\Controllers',
            'prefix' => '/api/v1',
            'middleware' => 'nuts.api.dev'
        ], function() {
            Route::group(['middleware' => 'nuts.api.jwtauth'], function() {

                // calendar(days)
                $url = 'calendar/{userCalendarId}/{year}/{month}';
                Route::get($url, 'CalendarController@index' );

                // user calendar
                Route::post('calendar', 'UserCalendarsController@store');
                Route::put('calendar/{id}', 'UserCalendarsController@update');
                Route::delete('calendar/{id}', 'UserCalendarsController@destroy');

                // user calendar members
                Route::post('calendar/member/add', 'UserCalendarsController@addMember');
                Route::delete('calendar/member/remove', 'UserCalendarsController@removeMember');

//                // user calendar members
//                $url = 'uscrCalendarMembers/{user_calendar_id}';
//                Route::get($url, 'UserCalendarMembersController@userIndex' );

                // member
                Route::get('member/index/{id}', 'MembersController@userIndex' );
                Route::post('member', 'MembersController@store' );
                Route::put('member/{id}', 'MembersController@update');
                Route::delete('member/{id}', 'MembersController@destroy' );

                // item
                Route::post('item', 'ItemsController@store' );
                Route::put('item/{id}', 'ItemsController@update' );
                Route::delete('item/{id}', 'ItemsController@destroy' );
            });
        });

        // -------------------------------------------------------------------
        // for Nuts\Api

        $this->app['router']->group([
            'namespace' => 'Nuts\Api\Controllers',
        ], function() {
            Route::get('/', 'PagesController@index');
            Route::get('/login', 'JwtAuthController@getLogin');
            Route::get('/register', 'JwtAuthController@getRegister');
            Route::get('/password/email', 'JwtPasswordController@getEmail');
            Route::get('/password/reset/{token?}', 'JwtPasswordController@getReset');

            //  do not apply nuts.api.jwtauth
            //  the access restriction should be handle at cliant side (vue.js)
            //Route::group(['middleware' => 'nuts.api.jwtauth'], function() {
                Route::get('/me/settings/{type}', 'JwtUserController@getSettings');
                Route::get('/dashboard', 'PagesController@index');
                Route::get('/dashboard/{type}', 'PagesController@index');
                Route::get('/calendar', 'PagesController@index');
                Route::get('/calendar/view', 'PagesController@index');
                Route::get('/calendar/settings/{type}', 'PagesController@index');
            //});

            Route::group([
                'prefix' => '/api/v1',
                'middleware' => 'nuts.api.dev',
            ], function() {
                Route::group(['middleware' => 'nuts.api.jsonthrottle:5,10'], function() {
                    Route::post('login', 'JwtAuthController@login');
                });
                Route::post('register', 'JwtAuthController@register');
                Route::post('password/reset', 'JwtPasswordController@postReset');
                Route::post('password/email/send', 'JwtPasswordController@postEmail');

                Route::group(['middleware' => 'nuts.api.jwtauth'], function() {
                    Route::get('data', 'DataController@index');
                    Route::get('me/{token?}', 'JwtUserController@getMe');
                    Route::put('me/settings', 'JwtUserController@putSettings');
                    Route::put('me/password', 'JwtUserController@putPasswordChange');
                });
            });

        });
    }

    protected function loadIncludes()
    {
        foreach (glob(__DIR__.'/../Includes/*.php') as $filename){
            require_once($filename);
        }
    }

    protected function registerViews()
    {
        //$this->loadViewsFrom(dirname(__FILE__).'/../views', 'nutsapi');
        $this->loadViewsFrom(__DIR__.'/../Views', 'nutsapi');
    }

}
