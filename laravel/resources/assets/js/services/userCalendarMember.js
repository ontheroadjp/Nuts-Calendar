import { focus } from '../directives/focus.js';
export default {
    directives: {
        focus
    },

    methods: {
        chengeMember: function(userCalendarId, memberId, value) {
            u.clog('checkMember()');

            const url =  '/api/v1/calendar/member';
            const data = {
                'user_calendar_id': userCalendarId,
                'member_id': memberId
            }

            if( value ) {
                this.addMember(url, data);
            } else {
                this.removeMember(url, data);
            }
        },

        addMember: function(url, data) {
            http.fetchPost(url, data)
                .then( response => {
                    u.clog("success");
                    this.$store.commit('dashboard/addUserCalendarMember', { obj: response.data });
                })
                .catch( error => {
                    u.clog('error: ' + error.response.status);
                });
        },

        removeMember: function(url, data) {
            http.fetchDelete( url, data)
                .then( response => {
                    u.clog("success");
                    this.$store.commit('dashboard/removeUserCalendarMember', { obj: response.data });
                })
                .catch( error => {
                    u.clog('error: ' + error.response.status);
                });
        }

    }
}
