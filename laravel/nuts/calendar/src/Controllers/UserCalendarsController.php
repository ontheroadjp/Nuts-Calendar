<?php

namespace Nuts\Calendar\Controllers;

use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Nuts\Calendar\Models\UserCalendar;
use Nuts\Calendar\Models\UserCalendarMember;

class UserCalendarsController extends Controller
{
    public function index(Request $request)
    {
        //$userId = $request->user()->id;
        $user = JWTAuth::parseToken()->toUser();
        $userId = $user->id;
        return UserCalendar::where('user_id', $userId)->get()->keyBy('id');
    }

    /**
     * Store a newly created Story in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $userId = $request->user()->id;
        $name = $request->input('name');
        $description = $request->input('description');

        $userCalendar = UserCalendar::create([
            'user_id' => $userId,
            'name' => $name,
            'description' => $description
        ]);

        $userCalendar->save();
        return $userCalendar;
    }

    public function update(Request $request, $id)
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

    public function addMember(Request $request)
    {
        return UserCalendarMember::create([
            'user_calendar_id' => $request->input('user_calendar_id'),
            'member_id' => $request->input('member_id')
        ]);
    }

    public function removeMember(Request $request)
    {
        $userCalendarId = $request->input('user_calendar_id');
        $memberId = $request->input('member_id');
        $target = UserCalendarMember::where('user_calendar_id', $userCalendarId)
            ->where('member_id', $memberId)->get();
        $target[0]->delete();
        return $target[0];
    }
}
