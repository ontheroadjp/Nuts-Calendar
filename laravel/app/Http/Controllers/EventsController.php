<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Event;
use App\Http\Requests;
use Illuminate\Http\JsonResponse;

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
        //return new JsonResponse($items);
        return $items;
    }

    public function indexRange(Event $event, $year, $month) {
        return $event->fetchRange($year, $month);
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
            ['member_id','content','date']
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
