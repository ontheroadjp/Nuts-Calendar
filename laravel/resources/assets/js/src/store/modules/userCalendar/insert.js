import {
    SET_INSERT_VALUE,
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER,
    RESET
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false,
        insertValues: {
            name: '',
            description: ''
        }
    },

    actions: {
        setInsertValue( { commit }, { key, value } ) {
            commit(SET_INSERT_VALUE, { key, value });
        },

        insert( { dispatch, commit, state }, { notify, successCb, failedCb } ) {
            u.clog('insert()');
            commit(IS_LOADING, true);

            const url = '/api/v1/calendar';

            const params = {
                'name': state.insertValues.name,
                'description': state.insertValues.description
            };

            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

                    const data = response.data;

                    commit('userCalendar/add', {
                        id: data.id,
                        userCalendar: data
                    }, { root: true } );

                    if(notify) {
                        commit(NOTIFY_SUCCESS, {
                            content: 'success add calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    commit(IS_LOADING, false);

                    if( typeof successCb === 'function' ) {
                        successCb();
                    }

                    commit(RESET);
                })

                .catch(error => {
                    u.clog('failed');

                    if(notify !== false) {
                        commit(NOTIFY_DANGER, {
                            content: 'failed add calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    commit(IS_LOADING, false);

                    if( typeof failedCb === 'function' ) {
                        failedCb();
                    }

                    commit(RESET);
                });
        },

        reset( { commit } ) {
            commit(RESET);
        }
    },

    mutations: {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [SET_INSERT_VALUE]( state, { key, value } ) {
            state.insertValues[key] = value;
        },

        [RESET]( state ) {
            state.isLoading = false;
            Object.keys(state.insertValues).forEach(function(key) {
                this[key] = '';
            }, state.insertValues );
        }
    }
};
