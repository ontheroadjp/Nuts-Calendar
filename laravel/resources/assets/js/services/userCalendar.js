import { focus } from '../directives/focus.js';

export default {
    directives: {
        focus
    },

    data() {
        return {
            isLoading: false,
            input: {
                name: '',
                description: ''
            }
        }
    },

    methods: {
        update(calendarId) {
            this.isLoading = true;
            const url = '/api/v1/calendar/' + calendarId;
            const data = {
                'name': this.input.name,
                'description': this.input.description,
            };
    
            http.fetchPut(url, data)
                .then( response => this.successUpdate(response))
                .catch( error => this.failedUpdate(error));
        },

        successUpdate(response) {
            u.clog('success');
            this.isLoading = false;

            const id = response.data.id;
            const name = response.data.name;
            const description = response.data.description;

            this.$store.commit('setUserCalendarName', {id:id, name:name});
            this.$store.commit('setUserCalendarDescription', {id:id, description:description});
        },

        failedUpdate(error) {
            u.clog('failed');
            this.isLoading = false;
        }
    }
}

