<template>
    <div id="calendar">
        <signboard 
            :calendar-service-is-loading="calendarService.isLoading"
        ></signboard>
    
        <router-view 
            :calendar-service-is-loading="calendarService.isLoading"
        ></router-view>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import signboard from '../partials/signboard/index.vue';
    import calendarService from '../../services/calendar.js';

    export default {
        name: 'calendar-root',

        components: {
            'signboard': signboard,
        },

        mixins: [
            calendarService,
        ],

        computed: {
            ...mapState({
                appReady: state => state.app.ready,
                currentCalendarId: state => state.calendar.currentId,
                currentYear: state => state.calendar.currentYear,
                currentMonth: state => state.calendar.currentMonth
            }),
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

<style lang="scss" scoped>
    /* empty */
</style>
