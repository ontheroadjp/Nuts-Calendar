export default {
    data() {
        return {
            memberService: {
                isLoading: false,
            }
        }
    },

    methods: {
        execInsertMember: function (userCalendarId, payload) {
            this.memberService.isLoading = true;
            const url = '/api/v1/member';
            const params = {
                'user_calendar_id': userCalendarId,
                'name': payload.name,
                'order': payload.order
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
            this.memberService.isLoading = false;
        },

        failedInsertMember(error) {
            u.clog('failed');
            this.memberService.isLoading = false;
        },

        execUpdateMember: function(id, name) {
            this.memberService.isLoading = true;
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
                'order': response.data.order
            });
            this.memberService.isLoading = false;
        },

        failedUpdateMember(error) {
            u.clog('failed');
            this.memberService.isLoading = false;
        },

        execDeleteMember: function(memberId) {
            this.memberService.isLoading = true;
            const url = '/api/v1/member/' + memberId;
    
            http.fetchDelete(url)
                .then(response => this.successDeleteMember(response))
                .catch(error => this.failedDeleteMember(error));
        },

        successDeleteMember(response) {
            u.clog('success');
            this.$store.commit('deleteMember', response.data.id);
            this.memberService.isLoading = false;
        },

        failedDeleteMember(error) {
            u.clog('error');
            this.memberService.isLoading = false;
        },
    }
}
