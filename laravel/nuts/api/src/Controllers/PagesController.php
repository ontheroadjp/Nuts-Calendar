<?php

namespace Nuts\Api\Controllers;

//use App\Http\Requests;
//use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class PagesController extends BaseController
{
    public function getTop()
    {
        return $this->showToppage();
    }

    protected function showToppage()
    {
        return view('nutsapi::vue');
    }

    public function getDashboard()
    {
        return $this->showDashboard();
    }

    protected function showDashboard() {
        return view('nutsapi::vue');
    }

    public function getUserCalendar()
    {
        return $this->showUserCalendar();
    }

    protected function showUserCalendar() {
        return view('nutsapi::vue');
    }
}
