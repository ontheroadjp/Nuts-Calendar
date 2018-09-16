<template>
    <div id="calendar">
        <signboard
            :calendar-is-loading="isLoading"
        ></signboard>

        <router-view
            :calendar-is-loading="isLoading"
        ></router-view>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import signboard from './signboard/index.vue';
//    import calendarService from '../../services/calendar.js';

    export default {
        name: 'calendar-root',

        components: {
            'signboard': signboard
        },

//        mixins: [
//            calendarService,
//        ],

        computed: {
            ...mapState({
                appReady: state => state.app.ready
            }),

            ...mapState('calendar', {
                currentCalendarId: state => state.currentId,
                currentYear: state => state.currentYear,
                currentMonth: state => state.currentMonth,
                isLoading: state => state.isLoading
            })
        },

        methods: {
            ...mapActions('calendar', {
                fetchCalendar: 'fetchCalendar'
            })
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
