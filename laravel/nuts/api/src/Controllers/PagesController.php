<?php

namespace Nuts\Api\Controllers;

//use App\Http\Requests;
//use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class PagesController extends BaseController
{
    protected function index() {
        return view('nutsapi::vue');
    }
}
