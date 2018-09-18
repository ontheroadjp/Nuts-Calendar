import { IS_LOADING } from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false
    },

    actions: {
        remove({ commit }, { userCalendarId, memberId }) {
            u.clog('checkMember()');
            commit(IS_LOADING, true);

            const url =  '/api/v1/calendar/member/remove';
            const data = {
                'user_calendar_id': userCalendarId,
                'member_id': memberId
            };

            http.fetchDelete( url, data)
                .then( response => {
                    u.clog("success");

                    commit('userCalendarMember/REMOVE', {
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
