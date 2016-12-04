<?php

namespace App;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendar';

    protected $fillable = [
        'date'
    ];

    public function fetch($year, $month)
    {
        $calendar = $this->specificMonth($year,$month);

        $members = Member::all()->keyBy('id');

        $calendar = $this->tidyEvents($calendar, $members);

         return [
             "members" => $members,
             "days" => $calendar
         ];
    }

    public function specificMonth($year,$month)
    {
        return Calendar::with('events')
            ->where('date', 'LIKE', "%$year-$month%")
            ->get();
    }

    private function tidyEvents(Collection $calendar, Collection $members)
    {
        $days = [];

        for( $n=0; $n < count($calendar); $n++ ) {
            $group_by = $calendar[$n]['events']
                ->groupBy('member_id');

            $diff = $members
                ->keys()
                ->diff($group_by->keys())
                ->flatten();

            for( $i=0; $i < count($diff); $i++ ) {
                $group_by->put($diff[$i], array(['editing' => false]));
            }

            $days[] = collect($calendar[$n])
                ->forget('events')
                ->put('events', $group_by);
        }

        return $days;
    }

    public function events()
    {
        return $this->hasMany(Event::class,'date','date');
    }
}
