export default {
    namespaced: true,

    state: {
        isLoading: false
    },

    actions: {
        remove({ commit }, { userCalendarId, memberId }) {
            u.clog('checkMember()');
            commit('isLoading', true);

            const url =  '/api/v1/calendar/member/remove';
            const data = {
                'user_calendar_id': userCalendarId,
                'member_id': memberId
            };

            http.fetchDelete( url, data)
                .then( response => {
                    u.clog("success");

//                    this.$store.commit('userCalendarMember/remove', {
//                        obj: response.data
//                    });

                    commit('userCalendarMember/remove', {
                        obj: response.data
                    }, { root: true });

                    commit('isLoading', false);
                })

                .catch( error => {
                    u.clog('error: ' + error.response.status);
                    commit('isLoading', false);
                });
        }

    },

    mutations: {
        isLoading( state, value ) {
            state.isLoading = value;
        }
    }
};
