<template>
    <div id="calendar">
        <signboard 
            :is-loading-calendar-api="isLoading.calendarApi"
        ></signboard>
    
        <router-view 
            :is-loading-calendar-api="isLoading.calendarApi"
        ></router-view>
    </div>
</template>

<script>
    import signboard from './signboard/index.vue';
    import calendarApi from '../../services/calendar.js';

    export default {
        name: 'calendar-root',
        components: {
            'signboard': signboard,
        },

        mixins: [
            calendarApi,
        ],

        computed: {
            appReady: function() {
                return this.$store.state.app.ready;
            },

            currentCalendarId: function() {
                return this.$store.state.calendar.currentId;
            },

            currentYear: function() {
                return this.$store.state.calendar.currentYear;
            },

            currentMonth: function() {
                return this.$store.state.calendar.currentMonth;
            },
        },

        watch: {
            'appReady': {
                handler: function(newVal, oldVal) {
                    if(!oldVal && newVal) {
                        u.clog('watch: appReady');
                        this.fetchCalendar(this.currentCalendarId);
                    }
                },
                deep: true
            },

            'currentCalendarId': {
                handler: function(newVal, oldVal) {
                    if( oldVal === '') return;
                    u.clog('watch: currentCalendarId');
                    if(this.$store.state.app.ready) {
                        this.fetchCalendar(this.currentCalendarId);
                    }
                },
                deep: true
            },

            'currentYear': {
                handler: function(newVal, oldVal) {
                    if( oldVal === '') return;
                    u.clog('watch: currentYear');
                    this.fetchCalendar(this.currentCalendarId);
                },
                deep: true
            },

            'currentMonth': {
                handler: function(newVal, oldVal) {
                    if( oldVal === '') return;
                    u.clog('watch: currentMonth');
                    this.fetchCalendar(this.currentCalendarId);
                },
                deep: true
            }
        }
    }
</script>
