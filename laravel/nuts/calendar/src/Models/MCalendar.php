<?php

namespace Nuts\Calendar\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class MCalendar extends Model
{
    protected $table = 'm_calendar';

    protected $fillable = [
        ''
    ];

    protected $appends = [
        'holidays'
    ];

    public function getHolidaysAttribute()
    {
        return [
            'is_saturday' => false,
            'is_sunday' => false
        ];
    }

//    public function getItemsAttribute() {
//        return [
//        ];
//    }

    public function items()
    {
        return $this->hasMany(Item::class, 'date', 'date');
    }

    public function fetch($userId, $userCalendarId)
    {
        if($userCalendarId === 'dashboard') return;

        $allMembers = Member::where('user_id', $userId)->get()->keyBy('id')->toArray();

        $userCalendarMemberIds = UserCalendarMember::where('user_calendar_id', $userCalendarId)
                                    ->get(['member_id'])
                                    ->keyBy('member_id')
                                    ->keys()
                                    ->toArray();

        $members = [];

        foreach( $allMembers as $key => $val ) {
            if( in_array($key, $userCalendarMemberIds) ) {
                $members += [$key => $val];
            }
        }

        array_multisort(array_column($members, 'created_at'), SORT_ASC, $members);

//        $calendar = $this->fetchCalendarWithItems();
        $mCalendar = MCalendar::with('items')->get();
        $mCalendar = $this->tidyItems($mCalendar, collect($members));

        $item = new Item();
        $items = $item->fetchSpecificMonth(2011, 3);

         return [
             "members" => $members,
             "items" => $items,
             "days" => $mCalendar
         ];
    }

//    public function fetchCalendarWithItems()
//    {
//        return MCalendar::with('items')->get();
//    }

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

            // add empty item
            for( $i=0; $i < count($diff); $i++ ) {
                $items_group_by->put($diff[$i], []);
            }

            // replace items to new one
            $days[] = collect($calendar[$n])
                ->forget('items')
                ->put('items', $items_group_by);
        }

        return $days;
    }
}
