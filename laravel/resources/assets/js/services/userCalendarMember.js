import { focus } from '../directives/focus.js';
export default {
    directives: {
        focus
    },

    methods: {
        update: function(userCalendarId, name, description) {
            u.clog('update()');
            http.fetchPut( '/api/v1/calendar/' + userCalendarId, {
                'name': name,
                'description': description
            }) 
                .then( response => {
                    u.clog("success");
                })
                .catch( error => {
                    u.clog('error: ' + error.response.status);
                });
        },

        chengeMember: function(userCalendarId, memberId, value) {
            u.clog('checkMember()');

            if( value ) {
                http.fetchPost( '/api/v1/calendar/member', {
                    'user_calendar_id': userCalendarId,
                    'member_id': memberId
                }) 
                    .then( response => {
                        u.clog("success: ['member_id' => " + response.data.member_id + "]");
                    })
                    .catch( error => {
                        u.clog('error: ' + error.response.status);
                    });

            } else {
                http.fetchDelete( '/api/v1/calendar/member', {
                    'user_calendar_id': userCalendarId,
                    'member_id': memberId
                })
                    .then( response => {
                        u.clog('success: ' + response.data + ' record(s) removed.');
                    })
                    .catch( error => {
                        u.clog('error: ' + error.response.status);
                    });

            }
        }

    }
}
