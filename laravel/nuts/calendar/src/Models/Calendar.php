<?php

namespace Nuts\Calendar\Models;

//use Nuts\Calendar\Models\Item;
//use Nuts\Calendar\Models\Member;
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
            'is_saturday' => false
            , 'is_sunday' => false
            , 'is_holiday' => false
        ];
    }

    public function items()
    {
        return $this->hasMany(Item::class,'date','date');
    }

    public function fetch($userId, $userCalendarId, $year, $month)
    {
//        $members = Member::where('user_id', $userCalendarId)
//                ->get()
//                ->keyBy('id');

        if($userCalendarId === 'dashboard') return;

        $allMembers = Member::where('user_id', $userId)->get()->toArray();

        $userCalendarMemberIds = UserCalendarMember::where('user_calendar_id', $userCalendarId)
                                    ->get(['member_id'])
                                    ->keyBy('member_id')
                                    ->keys()
                                    ->toArray();

        $members = [];
        foreach( $allMembers as $val ) {
            if( in_array($val['id'], $userCalendarMemberIds) ) {
                array_push($members, $val);
            }
        }

        $calendar = $this->fetchCalendarWithItems($year,$month);
        $calendar = $this->tidyItems($calendar, collect($members));

        $item = new Item();
        $items = $item->fetchSpecificMonth($year, $month);

         return [
             "members" => $members,
             "items" => $items,
             "days" => $calendar
         ];
    }

    public function fetchCalendarWithItems($year,$month)
    {
        return Calendar::with('items')
            ->where('date', 'LIKE', "%$year-$month%")
            ->get();
    }

    private function tidyItems(Collection $calendar, Collection $members)
    {
        $days = [];

        for( $n=0; $n < count($calendar); $n++ ) {

            // gather items into array key by member_id
            $items_group_by = $calendar[$n]['items']
                ->groupBy('member_id');

            // remove items(key = member_id) which doesn't exist in $members
            $items_group_by = collect(
                array_intersect_key(
                    $items_group_by->toArray(),
                    $members->toArray()
                )
            );

            $diff = $members
                ->keys()
                ->diff($items_group_by->keys())
                ->flatten();

            for( $i=0; $i < count($diff); $i++ ) {
                $items_group_by->put($diff[$i], []);
//                $items_group_by->put($diff[$i], array([
//                    'editing' => false,
//                    'is_hover' => false,
//                    'is_drag_start' => false
//                ]));
            }

            $days[] = collect($calendar[$n])
                ->forget('items')
                ->put('items', $items_group_by);
        }

        return $days;
    }
}
