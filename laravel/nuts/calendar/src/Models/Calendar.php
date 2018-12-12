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

    public function fetch($userId, $year = '', $month = '')
    {
        $allMembers = Member::where('user_id', $userId)
                        ->get(['id'])
                        ->keyBy('id')
                        ->toArray();

        // ini_set('memory_limit', '512M');

        if($year != '' && $month != '')
        {
            $calendar = $this->fetchCalendar($userId, $year, $month);
        } else if($year !== '') {
            $calendar = $this->fetchMonthlyCalendar($userId, $year);
        } else {
            return [ 'status' => 'Error' ];
        }

        return [
            "calendar" => $calendar,
            "members" => $allMembers
        ];
    }

    public function fetchAndTidyItems($userId, $year = '', $month = '')
    {
        $allMembers = Member::where('user_id', $userId)
                        ->get(['id'])
                        ->keyBy('id')
                        ->toArray();

        // ini_set('memory_limit', '512M');

        if($year != '' && $month != '')
        {
            $calendar = $this->fetchCalendar($userId, $year, $month);
        } else if($year !== '') {
            $calendar = $this->fetchMonthlyCalendar($userId, $year);
        } else {
            return [ 'status' => 'Error' ];
        }

        $results = $this->tidyItems($calendar, collect($allMembers));

        return [
            "days" => $results['days'],
            "members" => $allMembers,
            "items" => $results['items'],
        ];
    }

    public function fetchCalendar($userId, $year, $month)
    {
        return Calendar::with([
            'holidays',
            'items.rrule',
            'items' => function ($query) use ($userId)
            {
                $query->where('user_id', '=', $userId);
            }])->where('date', 'LIKE', "$year-$month-%")
            ->get();
    }

    public function fetchMonthlyCalendar($userId, $year)
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

            //// remove items(key = member_id) which doesn't exist in $members
            //$items_group_by = collect(
            //    array_intersect_key(
            //        $items_group_by->toArray(),
            //        $members->toArray()
            //    )
            //);

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

                    // as an object [{id: xxx}, {id: xxx}, ...]
                    $cellItems[$i] = array('id' => $cellItems[$i]->id);

                    //// as an array [id, id, id, ...]
                    //$cellItems[$i] = $cellItems[$i]->id;

                    // add holidays property if it does not exist
                    if( array_key_exists('holidays', $cellItems[$i]))
                    {
                        $cellItems[$i]->concat(['holidays' => '']);;
                    }

                }
            }

            // replace items to new one
            $days[] = collect($calendar[$n])
                ->forget('items')
                ->put('items', $items_group_by);
        }

        return array('days' => $days, 'items' => $standaloneItems);
    }
}
