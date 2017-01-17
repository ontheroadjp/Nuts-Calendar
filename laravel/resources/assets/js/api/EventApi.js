import VueResource from 'vue-resource';
import alertMixin from '../mixins/Alert.js';

export default {

    mixins: [
        alertMixin
    ],

    methods: {

        // -----------------------------------------------------------------------
        // Fetch
        fetchData: function (year, month) {
            this.$http({
                url: '/api/calendar/' + year + '/' + month,
                method: 'GET'

            }).then( function(response) {
                nutsHub.fire(
                    'api-fetch-data', 
                    {'response': response}, 
                    'EventApi.vue'
                );

            }, function(response) {
                this.alertDanger('Failed: fetch data!', false, 'EventApi.js');

            });
        },

        // -----------------------------------------------------------------------
        // Insert
        insertEvent: function (date, memberId, content, memberColumn) {

            var newItem = {
                'date': date,
                'member_id': memberId,
                'content': content
            };

            var url = '/api/event';
            Vue.http.headers.common['X-CSRF-TOKEN'] = this.getCsrfToken(); 

            this.$http({
                url: url,
                method: 'POST',
                body: newItem

            }).then( function(response) {
                memberColumn.push(response.data);
                this.alertSuccess('Success: inserted!', false, 'EventApi.js');

            }, function(response) {
                this.alertDanger('Failed: updated!', false, 'EventApi.js');

            });
        },

        // -----------------------------------------------------------------------
        // Edit
        editUpdateEvent: function(event) {
            event.editing = false;

            if(event.content == event.oldValue) {
                event.oldValue = '';
                return
            }

            event.oldValue = '';

            var url = '/api/event/' + event.id;
            Vue.http.headers.common['X-CSRF-TOKEN'] = this.getCsrfToken(); 

            this.$http({
                url: url,
                method: 'PATCH',
                body: event

            }).then( function(response) {
                this.alertSuccess('Success: updated!', false, 'EventApi.js');

            }, function(response) {
                this.alertDanger('Failed: updated!', false, 'EventApi.js');

            });
        },

        // -----------------------------------------------------------------------
        // Delete
        deleteEvent: function(members, event, index) {

            var url = '/api/event/' + event.id;
            Vue.http.headers.common['X-CSRF-TOKEN'] = this.getCsrfToken(); 

            this.$http({
                url: url,
                method: 'DELETE',

            }).then( function(response) {
                members.splice(index, 1);
                this.alertSuccess('Success: deleted!', false, 'EventApi.js');

            }, function(response) {
                this.alertDanger('Failed: deleted!', false, 'EventApi.js');

            });
        },

        // -----------------------------------------------------------------------
        // CSRF Token
        getCsrfToken() {
            return $('meta[name="csrf-token"]').attr('content');
        }

    }
}
