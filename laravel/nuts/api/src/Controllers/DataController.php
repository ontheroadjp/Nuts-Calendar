<?php

/*
 * This file is part of laravel-api.
 *
 * (c) Hideaki Ishihara <dev@nutsllc.jp>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nuts\Api\Controllers;

use Nuts\Calendar\Models\Member;
use Nuts\Api\Requests\DataRequest;
use Nuts\Calendar\Models\Calendar;
use Nuts\Calendar\Models\UserCalendar;
use Nuts\Api\Responses\JwtAuthJsonResponse;
use Nuts\Calendar\Models\UserCalendarMember;
use Nuts\Calendar\Controllers\MembersController;
use Illuminate\Routing\Controller as BaseController;

class DataController extends BaseController
{
    use JwtAuthJsonResponse;

    public function index(DataController $request)
    {
        $user = auth()->user();
        $userId = $user->id;
        $userCalendars = UserCalendar::where('user_id', $userId)->get()->keyBy('id')->sort();

        $userCalendarKeys = $userCalendars->keys()->all();

        if(count($userCalendarKeys) === 0 ) {
            return $this->sendUserCalendarNotFound();
        }

//        $members = DB::table('users')
//            ->join('user_calendars', 'users.id', '=', 'user_calendars.user_id')
//            ->join('members', 'user_calendars.id', '=', 'members.user_calendar_id')
//            ->select('members.name', 'members.id as member_id', 'user_calendars.id as user_calendar_id')
//            ->where('users.id', '=', $userId)
//            ->get();

        $members = Member::all();
        $userCalendarMembers = UserCalendarMember::all();

        // calendar
//        $currentCalendarId = $userCalendarKeys[0];
//
//        $year = '2017';
//        $month = '04';
//
//        $cal = new Calendar();
//        $calendar = $cal->fetch($currentCalendarId, $year, $month); // 5382

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'application data',
            'currentuser' => auth()->user(),
            'usercalendar' => $userCalendars,
            'usercalendar_members' => $userCalendarMembers,
            'members' => $members,
//            'currentCalendarId' =>  $currentCalendarId,
//            'days' => $calendar['days'],
//            'members' => $calendar['members'],
//            'items' => $calendar['items'],
        ]);
    }
}

