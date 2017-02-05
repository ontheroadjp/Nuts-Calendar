<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\UserCalendar;
use App\Http\Requests;
use Illuminate\Http\Request;

class UserCalendarsController extends Controller
{
    public function index(Request $request)
    {
        //$userId = $request->user()->id;
        $user = JWTAuth::parseToken()->toUser();
        $userId = $user->id;
        return UserCalendar::where('user_id', $userId)->get()->keyBy('id');
    }
}
