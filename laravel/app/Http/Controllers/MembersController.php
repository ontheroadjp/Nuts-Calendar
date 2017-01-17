<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Member;
use App\Http\Requests;

class MembersController extends Controller
{
    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Member::all();
        return $items;
    }

    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
//    public function indexWith()
//    {
//        //$items = Member::with('events')->get();
//        //return $items;
//
//        $target = "2016-12";
//
//        return Member::with([
//            'events' => function($query) {
//                $target = "2016-12-12";
//                $query->where('date', 'like', "%$target%");
//            }
//        ])->get();
//    }

    /**
     * Display the specified Story.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Member::findOrAbort($id);
    }

    /**
     * Store a newly created Story in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'color' => 'required'
        ]);

        $item = new Member($request->all());
        $item->save();
        return $item;
    }

    /**
     * Update the specified Member in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $item = Member::findOrAbort($id);
        $item->fill($request->only(
            //Member::getFillable()
            ['name','color']
        ));
        $item->save();
        return $item;
    }

    /**
     * Remove the specified Story from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Member::findOrAbort($id);
        $item->delete();

        return \Response::json([
            'success' => true
        ]);
    }
}
