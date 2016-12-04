<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Calendar;
use App\Http\Requests;

class CalendarController extends Controller
{
    /**
     * Display a calendar of the specific month
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Calendar $calendar, $year, $month)
    {
        return $calendar->fetch($year,$month);
    }
}
