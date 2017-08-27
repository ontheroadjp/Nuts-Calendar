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
                    u.clog("success: ['member_id' => " + response.data.member_id + "]");
                })
                .catch( error => {
                    u.clog('error: ' + error.response.status);
                });
        },

        removeMember: function(url, data) {
            http.fetchDelete( url, data)
                .then( response => {
                    u.clog('success: ' + response.data + ' record(s) removed.');
                })
                .catch( error => {
                    u.clog('error: ' + error.response.status);
                });
        }

    }
}
