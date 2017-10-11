import { IS_LOADING } from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state }, { id, notify, successCb, failedCb } ) {
            u.clog('remove()');
//            commit('isLoading', true);
            commit(IS_LOADING, true);

            const url = '/api/v1/calendar/' + id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('userCalendar/remove', {
                        id: id
                    }, { root: true });

                    if(notify) {
                        commit('notifySuccess', {
                            content: 'success remove calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    if( typeof successCb === 'function' ) {
                        successCb();
                    }

//                    commit('isLoading', false);
                    commit(IS_LOADING, false);
                })

                .catch(error => {
                    u.clog('failed');

                    if( notify !== false ) {
                        commit('notifyDanger', {
                            content: 'failed remove member',
                            isImportant: false
                        }, { root: true });
                    }

                    if( typeof failedCb === 'function' ) {
                        failedCb();
                    }

//                    commit('isLoading', false);
                    commit(IS_LOADING, false);
                });
        }
    },

    mutations: {
//        isLoading( state, value ) {
        [IS_LOADING]( state, value ) {
            state.isLoading = value
        }
    }
};
