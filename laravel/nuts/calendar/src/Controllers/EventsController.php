<?php

namespace Nuts\Calendar\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Nuts\Calendar\Models\Event;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Event::with('member')->get();
        return $items;
    }

    public function indexSpecificMonth(Event $event, $year, $month) {
        return $event->fetchSpecificMonth($year, $month);
    }

    /**
     * Display the specified Event.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Event::findOrAbort($id);
    }

    /**
     * Store a newly created Event in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = new Event($request->all());
        $item->save();
        return $item;
    }

    /**
     * Update the specified Event in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $item = Event::findOrAbort($id);
        $item->fill($request->only(
            //Event::getFillable()
            ['member_id','content','date','start_time', 'end_time']
        ));
        $item->save();
        return $item;
    }

    /**
     * Remove the specified Event from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Event::findOrAbort($id);
        $item->delete();

        return \Response::json([
            'success' => true
        ]);
    }
}
