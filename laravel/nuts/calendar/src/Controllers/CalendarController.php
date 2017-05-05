<?php

namespace Nuts\Calendar\Controllers;

use App\Http\Requests;
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
    public function index(Calendar $calendar, $userCalendarId, $year, $month)
    {
        return $calendar->fetch($userCalendarId, $year,$month);
    }
}
