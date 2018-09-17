<?php

namespace Nuts\Calendar\Controllers;

use Illuminate\Http\Request;
use Nuts\Calendar\Models\MCalendar;
use App\Http\Controllers\Controller;

class MCalendarController extends Controller
{
    /**
     * Display a calendar of the specific month
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, MCalendar $mCalendar, $userCalendarId)
    {
        $userId = $request->user()->id;
        return $mCalendar->fetch($userId, $userCalendarId);
    }
}

