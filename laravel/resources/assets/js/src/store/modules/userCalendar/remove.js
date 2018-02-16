import {
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER,
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state }, { id, notify, successCb, failedCb } ) {
            u.clog('remove()');
            commit(IS_LOADING, true);

            const url = '/api/v1/calendar/' + id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('userCalendar/remove', {
                        id: id
                    }, { root: true });

                    if(notify) {
                        commit(NOTIFY_SUCCESS, {
                            content: 'success remove calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    if( typeof successCb === 'function' ) {
                        successCb();
                    }

                    commit(IS_LOADING, false);
                })

                .catch(error => {
                    u.clog('failed');

                    if( notify !== false ) {
                        commit(NOTIFY_DANGER, {
                            content: 'failed remove member',
                            isImportant: false
                        }, { root: true });
                    }

                    if( typeof failedCb === 'function' ) {
                        failedCb();
                    }

                    commit(IS_LOADING, false);
                });
        }
    },

    mutations: {
        [IS_LOADING]( state, value ) {
            state.isLoading = value
        }
    }
};
