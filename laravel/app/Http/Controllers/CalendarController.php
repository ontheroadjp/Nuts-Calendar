<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Calendar;
use App\Http\Requests;

class CalendarController extends Controller
{
    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
    public function index($year, $month)
    {
        $items = Calendar::range($year,$month);
        return $items;
    }
}
