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
use Nuts\Calendar\Models\Userplan;
use Nuts\Calendar\Models\UserCalendar;
use Nuts\Calendar\Models\UserCalendarMember;
use Illuminate\Routing\Controller as BaseController;

class DataController extends BaseController
{
    public function index()
    {
        $user = auth()->user();
        $userplan = Userplan::all()->keyBy('id');
        $userCalendars = UserCalendar::where('user_id', $user->id)->get()->keyBy('id')->sort();
        $members = Member::with('groupMembers')->where('user_id', $user->id)->get()->keyBy('id')->sortBy('created_at');
        $userCalendarMembers = UserCalendarMember::where('user_id', $user->id)->get();

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'application data',
            'userplan' => $userplan,
            'user' => $user,
            'usercalendar' => $userCalendars,
            'members' => $members,
            'usercalendar_members' => $userCalendarMembers
        ]);
    }
}
