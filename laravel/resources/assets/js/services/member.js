export default {
    methods: {
        execInsertMember: function (userCalendarId, payload) {
            const url = '/api/v1/member';
            const params = {
                'user_calendar_id': userCalendarId,
                'name': payload.name,
                'order': payload.order,
                'color': 'primary'
            };
            
            http.fetchPost(url, params)
                .then(response => this.successInsertMember(response))
                .catch(error=> this.failedInsertMember(error));
        },

        successInsertMember(response) {
            u.clog('success');
            response.data.isShow = true;
            this.$store.commit('addMember', {
                'key': response.data.id,
                'data': response.data
            });
            this.input.name = '';
        },

        failedInsertMember(error) {
            u.clog('failed');
        },

        execUpdateMember: function(id, name) {
            const url = '/api/v1/member/' + id;
            const data = {
                'name': name,
                '_method': 'PUT',
            };
    
            http.fetchPost(url, data)
                .then( response => this.successUpdateMember(response) )
                .catch( error => this.failedUpdateMember(error) );
        },

        successUpdateMember(response) {
            u.clog('success');
            this.$store.commit('updateMember', {
                'id': response.data.id,
                'name': response.data.name,
                'order': response.data.order,
                'color': response.data.color
            });
        },

        failedUpdateMember(error) {
            u.clog('failed');
        },

    }
}
