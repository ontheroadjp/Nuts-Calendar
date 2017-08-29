<?php

namespace Nuts\Calendar\Controllers;

use Illuminate\Http\Request;
use Nuts\Calendar\Models\Calendar;
use App\Http\Controllers\Controller;

class CalendarController extends Controller
{
    /**
     * Display a calendar of the specific month
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Calendar $calendar, $userCalendarId, $year, $month)
    {
        $userId = $request->user()->id;
        return $calendar->fetch($userId, $userCalendarId, $year,$month);
    }
}
