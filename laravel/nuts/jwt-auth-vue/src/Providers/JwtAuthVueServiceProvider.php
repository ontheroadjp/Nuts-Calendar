<?php

namespace Nuts\JwtAuthVue\Providers;

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
//        $this->registerRoutes();
//        $this->registerViews();
//        $this->loadIncludes();
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

        $this->app['router']->group([
            'namespace' => 'Nuts\Api\Controllers',
        ], function() {

            Route::get('/', 'PagesController@getTop');
            Route::get('/dashboard', 'PagesController@getDashboard');
            Route::get('/user/settings', 'JwtUserController@getSettings');
            Route::get('/calendar/{userCalendarId}', 'PagesController@getUserCalendar');

            Route::get('login', 'JwtAuthController@getLogin');
            Route::get('register', 'JwtAuthController@getRegister');
            Route::get('password/email', 'JwtPasswordController@getEmail');
            Route::get('password/reset/{token}', 'JwtPasswordController@getReset');

            Route::group(['prefix' => '/api/v1'], function() {
                Route::get('jwttoken', 'JwtAuthController@checkAuth');
                Route::post('login', 'JwtAuthController@postLogin');
                Route::post('register', 'JwtAuthController@postRegister');
                Route::post('password/email', 'JwtPasswordController@postEmail');
                Route::post('password/reset', 'JwtPasswordController@postReset');
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
        $this->loadViewsFrom(__DIR__.'/../Views', 'nutsapi');
    }

}

