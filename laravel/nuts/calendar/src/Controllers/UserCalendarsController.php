<?php

namespace Nuts\Calendar\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Nuts\Calendar\Models\UserCalendar;

class UserCalendarsController extends Controller
{
    public function index(Request $request)
    {
        //$userId = $request->user()->id;
        $user = JWTAuth::parseToken()->toUser();
        $userId = $user->id;
        return UserCalendar::where('user_id', $userId)->get()->keyBy('id');
    }

    public function update($id, Request $request)
    {
        $item = UserCalendar::findOrAbort($id);
        if( $item instanceof \Illuminate\Http\JsonResponse ) {
            return $item;
        }

        $item->fill($request->only([
            'name','description'
        ]));
        $item->save();
        return $item;
    }
}
