<?php

namespace Nuts\Calendar\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Nuts\Calendar\Models\Member;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

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

    public function userIndex()
    {
        $results = DB::table('users')
            ->join('user_calendars', 'users.id', '=', 'user_calendars.user_id')
            ->join('members', 'user_calendars.id', '=', 'members.user_calendar_id')
            ->select('users.name', 'members.name', 'user_calendars.id')
            ->get();

        return $results;
    }

    /**
     * Display a listing of items
     *
     * @return \Illuminate\Http\Response
     */
//    public function indexWith()
//    {
//        //$items = Member::with('items')->get();
//        //return $items;
//
//        $target = "2016-12";
//
//        return Member::with([
//            'items' => function($query) {
//                $target = "2016-12-12";
//                $query->where('date', 'like', "%$target%");
//            }
//        ])->get();
//    }

    /**
     * Display the specified Story.
     *
     * @param  int $id member id
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
        ]);

        $userId = $request->user()->id;
        $name = $request->input('name');

        $item = Member::create([
            'user_id' => $userId,
            'name' => $name
        ]);

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
        if( $item instanceof \Illuminate\Http\JsonResponse ) return $item;

        $item->fill($request->only(
            //Member::getFillable()
            //['name','order', 'color']
            ['name']
        ));
        $item->save();
        return $item;
    }

    /**
     * Remove the specified Story from storage.
     *
     * @param int $id
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
