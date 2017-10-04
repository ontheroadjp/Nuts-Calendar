<?php

    namespace Nuts\Calendar\Libs;

    class GoogleCalendar
    {
        private $apiKey;

        public function __construct( $apiKey )
        {
            $this->apiKey = $apiKey;
        }

        public function fetch($startDate, $endDate, $holidaysId, $maxResults)
        {
            $holidays_url = sprintf(
                'https://www.googleapis.com/calendar/v3/calendars/%s/events?'.
                'key=%s&timeMin=%s&timeMax=%s&maxResults=%d&orderBy=startTime&singleEvents=true',
                $holidaysId,
                $this->apiKey,
                $startDate,
                $endDate,
                $maxResults
            );

            if( $results = file_get_contents($holidays_url, true))
            {
                $results = json_decode($results);

                $holidays = array();
                foreach($results->items as $item)
                {
                    $date = strtotime((string) $item->start->date);
                    $title = (string) $item->summary;
                    $holidays[date('Y-m-d', $date)] = $title;
                }

                ksort($holidays);

                return $holidays;
            }
        }
    }
?>
