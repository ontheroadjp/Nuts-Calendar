export default {
    namespaced: true,

    state: {
        isLoading: false
    },

    actions: {
        insert({ commit }, { userCalendarId, memberId }) {
            u.clog('insert()');
            commit('isLoading', true);

            const url =  '/api/v1/calendar/member';
            const data = {
                'user_calendar_id': userCalendarId,
                'member_id': memberId
            };

            http.fetchPost(url, data)
                .then( response => {
                    u.clog("success");

                    commit('userCalendarMember/add', {
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
