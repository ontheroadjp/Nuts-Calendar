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
        return UserCalendar::where('user_id', $userId)->get()->keyBy('id')->sort();
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
            'id' => 'uc_'.md5( uniqid(mt_rand(), true) ),
            'user_id' => $userId,
            'name' => $name,
            'description' => $description
        ]);

        $userCalendar->save();
        return $userCalendar;
    }

    public function update(Request $request, $id)
    {
        $userCalendar = UserCalendar::findOrAbort($id);
        if( $userCalendar instanceof \Illuminate\Http\JsonResponse ) {
            return $userCalendar;
        }

        $userCalendar->fill($request->only([
            'name','description'
        ]));

        $userCalendar->save();
        return $userCalendar;
    }

    /**
     * Remove the specified Story from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $userCalendar = UserCalendar::findOrAbort($id);

        if( ! $userCalendar instanceof UserCalendar ) {
            return [
                'status' => 400,
                'message' => 'user calendar id does not exist'
            ];
        }

        $userCalendar->delete();
        return $userCalendar;
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
