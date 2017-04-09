import focus from '../directives/form-focus.js';

export default {
    directives: {
        focus
    },

    data() {
        return {
            isLoading: {
                calendarApi: false
            },
            input: {
                name: '',
                description: '',
            }
        }
    },

    methods: {
        fetchCalendar(calendarId) {
            u.clog('fetchCalendar(' + calendarId + ')');
            this.isLoading.calendarApi = true;
    
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
            this.$store.commit('initMembers', response.data.members );
            this.isLoading.calendarApi = false;
        },

        failedFetchCalendar(error) {
            u.clog('failed');
            this.isLoading.calendarApi = false;
        },

        execPutCalendarSettings(calendarId) {
//            u.clog('execPutCalendarSettings(' + calendarId + ')');
//            this.isLoading.calendarApi = true;
    
            const url = '/api/v1/calendar/' + calendarId;
            const data = {
                'name': this.input.name,
                'description': this.input.description,
                '_method': 'PUT',
            };
    
            http.fetchPost(url, data)
                .then( response => this.successPutCalendarSettings(response))
                .catch( error => this.failedPutCalendarSettings(error));
        },

        successPutCalendarSettings(response) {
            u.clog('success');
            const id = response.data.id;
            const name = response.data.name;
            const description = response.data.description;

            this.$store.commit('setCalendarName', {id:id, name:name});
            this.$store.commit('setCalendarDescription', {id:id, description:description});
        },

        failedPutCalendarSettings(error) {
            u.clog('failed');
        },

    },

}
