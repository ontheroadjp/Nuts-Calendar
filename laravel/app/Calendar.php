<?php

namespace App;

use App\Event;
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

    public function events()
    {
        return $this->hasMany(Event::class,'date','date');
    }

    public function fetch($year, $month)
    {
        $calendar = $this->specificMonth($year,$month);

        $members = Member::all()->keyBy('id');

        $calendar = $this->tidyEvents($calendar, $members);

        $e = new Event();
        $events = $e->fetchRange($year, $month);

         return [
             "members" => $members,
             "events" => $events,
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
                $group_by->put($diff[$i], array([
                    'editing' => false,
                    'is_hover' => false
                ]));
            }

            $days[] = collect($calendar[$n])
                ->forget('events')
                ->put('events', $group_by);
        }

        return $days;
    }

}
