<?php

namespace Nuts\Calendar\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendar';

    protected $fillable = [
        'date'
    ];

    protected $appends = [
        'flags'
    ];

    public function getFlagsAttribute() {
        return [
            'is_saturday' => false,
            'is_sunday' => false
        ];
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'date', 'date');
    }

    public function holidays()
    {
        return $this->hasMany(Holiday::class, 'date', 'date');
    }

    public function fetch($userId, $userCalendarId, $year = '', $month = '')
    {
        if($userCalendarId === 'dashboard') return;

        $allMembers = Member::where('user_id', $userId)->get()->keyBy('id')->toArray();

//        $userCalendarMemberIds = UserCalendarMember::where('user_calendar_id', $userCalendarId)
//                                    ->get(['member_id'])
//                                    ->keyBy('member_id')
//                                    ->keys()
//                                    ->toArray();
//        $members = [];
//
//        foreach( $allMembers as $key => $val ) {
//            if( in_array($key, $userCalendarMemberIds) ) {
//                $members += [$key => $val];
//            }
//        }
//
//        array_multisort(array_column($members, 'created_at'), SORT_ASC, $members);

        if($year != '' && $month != '')
        {
            $calendar = $this->fetchCalendarWithHolidayAndItems($userId, $year,$month);
        } else {
            $calendar = $this->fetchMCalendarWithItems($userId, date('Y'));
        }

        $results = $this->tidyItems($calendar, collect($allMembers));

        return [
            "members" => $allMembers,
            "days" => $results['days'],
            "itemsInDaysFormat" => $results['items'],
//            "items" => $this->keyByItemId($results['items'])
            "items" => $results['items'],
            "calendar" => $calendar
        ];
    }

    public function fetchCalendarWithHolidayAndItems($userId, $year,$month)
    {
//        ini_set('memory_limit', '512M');

//        return Calendar::with('holidays', 'items.rrule')
//            ->where('date', 'LIKE', "$year-$month-%")
//            ->get();

        return Calendar::with([
            'holidays', 'items' => function ($query) use ($userId)
            {
//                $query->leftjoin('rrules', 'items.rrule_id', '=', 'rrules.id')
//                        ->where('user_id', '=', $userId);
//                $query->where('user_id', '=', $userId);
            }])->where('date', 'LIKE', "$year-$month-%")
            ->get();

    }

    public function fetchMCalendarWithItems($userId, $year)
    {
        return Calendar::with([
            'items.rrule',
            'items' => function($query) use ($userId)
            {
                $query->where('user_id', '=', $userId);
            }])->where('date', 'LIKE', "$year-%")
            ->where('gregorian_day', '=', "0")
            ->get();
    }

//    private function keyByItemId($items)
//    {
//        $newItems = [];
//        for( $n=0; $n < count($items); $n++ )
//        {
//            foreach($items[$n] as $key => $val) {
//                for( $i=0; $i < count($val); $i++){
//                    $newItems += array($val[$i]['id'] => $val[$i]);
//                }
//            }
//        }
//        return $newItems;
//    }

    private function tidyItems(Collection $calendar, Collection $members)
    {
        $days = [];
        $items = [];
        $standaloneItems = '';

        for( $n=0; $n < count($calendar); $n++ )
        {

            // gather items into array key by member_id
            $items_group_by = $calendar[$n]['items']
                ->groupBy('member_id');


//            // remove items(key = member_id) which doesn't exist in $members
//            $items_group_by = collect(
//                array_intersect_key(
//                    $items_group_by->toArray(),
//                    $members->toArray()
//                )
//            );

            $diff = $members
                ->keys()
                ->diff($items_group_by->keys())
                ->flatten();

            // add empty item (cellItems)
            for( $i=0; $i < count($diff); $i++ )
            {
                $items_group_by->put($diff[$i], []);
            }

            // restracturing: cellitems = [id, id, id...]
            // and $standaloneItems = [id:{...}, id:{...}, ...] for items
            foreach($items_group_by as $memberId => $cellItems)
            {
                for($i=0; $i<count($cellItems); $i++)
                {
                    $standaloneItems[$cellItems[$i]->id] = $cellItems[$i];

                    // object [{id: xxx}, ...]
                    $cellItems[$i] = array('id' => $cellItems[$i]->id);

//                    // array [id, id, id, ...]
//                    $cellItems[$i] = $cellItems[$i]->id;
                }
            }


            // replace items to new one
            $days[] = collect($calendar[$n])
                ->forget('items')
                ->put('items', $items_group_by);

//            $items[] = $items_group_by;
        }

//        return array('days' => $days, 'items' => $items);
        return array('days' => $days, 'items' => $standaloneItems);
    }
}
