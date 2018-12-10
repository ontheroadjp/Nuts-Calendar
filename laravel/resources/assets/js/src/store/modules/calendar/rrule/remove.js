import {
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false
    },

    actions: {
        remove( { commit, state }, { id, notify, successCb, failedCb } ) {
            u.clog('remove()');
            commit(IS_LOADING, true);

            const url = '/api/v1/member/' + id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('member/REMOVE', { id }, { root: true });

                    if(notify) {
                        commit(NOTIFY_SUCCESS, {
                            content: 'success remove member',
                            isImportant: false
                        }, { root: true });
                    }

                    successCb();

                    commit(IS_LOADING, false);
                })

                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    failedCb();

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
