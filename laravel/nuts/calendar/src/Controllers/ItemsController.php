<?php

namespace Nuts\Calendar\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Nuts\Calendar\Models\Item;
use App\Http\Controllers\Controller;

class ItemsController extends Controller
{
    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::with('member')->get();
        return $items;
    }

    public function indexSpecificMonth(Item $item, $year, $month) {
        return $item->fetchSpecificMonth($year, $month);
    }

    /**
     * Display the specified Item.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Item::findOrAbort($id);
    }

    /**
     * Store a newly created Item in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        var_dump($request);
        $item = new Item($request->all());
        $item->save();
        return $item;
    }

    /**
     * Update the specified Item in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $item = Item::findOrAbort($id);
        $item->fill($request->only(
            //Item::getFillable()
            ['member_id','content','date','start_time', 'end_time']
        ));
        $item->save();
        return $item;
    }

    /**
     * Remove the specified Item from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::findOrAbort($id);
        $item->delete();

        return \Response::json([
            'success' => true
        ]);
    }
}
