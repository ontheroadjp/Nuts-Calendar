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

    export default {
        name: 'calendar-root',

        components: {
            'signboard': signboard
        },

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
                        this.fetchCalendar();
                    }
                },
                deep: true
            }
        }
    }
</script>
