export default {
    methods: {
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
                'color': response.data.color
            });
        },

        failedUpdateMember(error) {
            u.clog('failed');
        },

    }
}
