import { focus } from '../directives/focus.js';

export default {
    directives: {
        focus
    },

    data() {
        return {
            input: {
                name: '',
                description: ''
            }
        }
    },

    methods: {
        update(calendarId) {
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
            const id = response.data.id;
            const name = response.data.name;
            const description = response.data.description;

            this.$store.commit('setUserCalendarName', {id:id, name:name});
            this.$store.commit('setUserCalendarDescription', {id:id, description:description});
        },

        failedUpdate(error) {
            u.clog('failed');
        }
    }
}

