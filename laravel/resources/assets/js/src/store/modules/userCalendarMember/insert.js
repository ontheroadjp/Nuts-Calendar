import { IS_LOADING } from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false
    },

    actions: {
        insert({ commit }, { userId, userCalendarId, memberId }) {
            u.clog('insert()');
            commit(IS_LOADING, true);

            const url =  '/api/v1/calendar/member/add';
            const data = {
                'user_id': userId,
                'user_calendar_id': userCalendarId,
                'member_id': memberId
            };

            http.fetchPost(url, data)
                .then( response => {
                    u.clog("success");

                    commit('userCalendarMember/ADD', {
                        obj: response.data
                    }, { root: true });

                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('error: ' + error.response.status);
                    commit(IS_LOADING, false);
                });
        }
    },

    mutations: {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        }
    }
};
