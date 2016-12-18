export default {
    methods: {

        // -----------------------------------------------------------------------
        // Fetch
        fetchData: function (year, month) {
            this.fetchCalendar(year, month);
            this.fetchEvents(year, month);
        },

        fetchCalendar: function (year, month) {
            console.log('hogehoge');
            this.$http({
                url: '/api/calendar/' + year + '/' + month,
                method: 'GET'

            }).then( function(response) {
                this.$root.$emit('api-fetch-calendar', response);

            }, function(response) {
                this.$root.$emit('nuts-alert', 'Failed - Add new event!', 'is-danger');
            });
        },

        // -----------------------------------------------------------------------
        // Fetch events
        fetchEvents: function(year, month) {
            this.$http({
                //url: '/api/event',
                url: '/api/event/' + year + '/' + month,
                method: 'GET'

            }).then( function(response) {
                this.$root.$emit('api-fetch-events', response);
            }, function(response) {
                this.$root.$emit('nuts-alert', 'Failed - Fetch event data!', 'is-danger');
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
                this.$root.$emit('nuts-alert', 'Inserted!','is-success');

            }, function(response) {
                this.$root.$emit('nuts-alert', 'Failed - Add new event!', 'is-danger');

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
                this.$root.$emit('nuts-alert', 'Updateed!','is-success');

            }, function(response) {
                this.$root.$emit('nuts-alert', 'Failed - Update!', 'is-danger');
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
                this.$root.$emit('nuts-alert', 'Deletes!','is-success');

            }, function(response) {
                this.$root.$emit('nuts-alert', 'Failed - Deletes!', 'is-danger');
            });
        },

        // -----------------------------------------------------------------------
        // CSRF Token
        getCsrfToken() {
            return $('meta[name="csrf-token"]').attr('content');
        }

    }

}
