import {
    SET_INSERT_VALUE,
    IS_LOADING,
    RESET,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false,
        insertValues: {
            userId: '',
            rruleString: '',
            rruleText: '',
            rruleJson: ''
        }
    },

    actions: {
        setInsertValue( { commit }, { key, value } ) {
            commit(SET_INSERT_VALUE, { key, value });
        },

        insert( { dispatch, commit, state } ) {
            u.clog('insert()');
            commit(IS_LOADING, true);

            const url = '/api/v1/member';

//            const params = {
//                name: state.insertValues.name,
//                description: state.insertValues.description
//            };

            http.fetchPost(url, state.insertValues)
                .then(response => {
                    u.clog('success');

                    const data = response.data;

                    commit('rrule/ADD', {
                        id: data.id,
                        rrule: data
                    }, { root: true } );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success add rrule',
                        isImportant: false
                    }, { root: true });

                    commit(IS_LOADING, false);
                    commit(RESET);
                })

                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed add rrule',
                        isImportant: false
                    }, { root: true });

                    commit(IS_LOADING, false);
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
