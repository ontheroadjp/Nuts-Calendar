<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\UserCalendar;
use App\Http\Requests;

class UserCalendarsController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        return UserCalendar::where('user_id', $userId)->get();
    }
}
