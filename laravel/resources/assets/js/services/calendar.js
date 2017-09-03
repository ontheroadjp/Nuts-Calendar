import { focus } from '../directives/focus.js';

export default {
    directives: {
        focus
    },

    data() {
        return {
            calendarService: {
                isLoading: false
            },
        }
    },

    methods: {
        toggleShowHideColumn(id, value) {
            this.$store.commit('toggleShowHideColumn', { 'id': id, 'value': value });
        },

        toggleShowHideEventItem(value) {
            this.$store.commit('toggleShowHideEventItem', !this.isEventItemShow)
        },

        toggleShowHideTaskItem(value) {
            this.$store.commit('toggleShowHideTaskItem', !this.isTaskItemShow)
        },

        resetToolPalette() {
            this.$store.commit('resetToolPalette');
        },

        fetchCalendar(calendarId) {
            u.clog('fetchCalendar(' + calendarId + ')');
            if(calendarId === 'dashboard') return;

            this.calendarService.isLoading = true;
    
            const id = calendarId;
            const y = this.$store.state.calendar.currentYear;
            const m = this.$store.state.calendar.currentMonth;
            const url = '/api/v1/calendar/' + id + '/' + y + '/' + m;
    
            http.fetchGet(url)
                .then( response => {
                    this.successFetchCalendar(response);
                })
                .catch( error => {
                    this.failedFetchCalendar(error);
                });
        },

        successFetchCalendar(response) {
            u.clog('success');
            this.$store.commit('initCalendar', response.data.days );

            Object.keys(response.data.members).forEach(function(key) {
                let val = this[key];
                val.isShow = true;
                u.clog(key + ':' + val.name);
            }, response.data.members);

//            this.$store.commit('initMembersForUserCalendar', response.data.members );
            this.calendarService.isLoading = false;
        },

        failedFetchCalendar(error) {
            u.clog('failed');
            this.calendarService.isLoading = false;
        },

    }
}
