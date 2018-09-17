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
            name: '',
            description: ''
        }
    },

    actions: {
        setInsertValue( { commit }, { key, value } ) {
//            commit('setInsertValue', { key, value });
            commit(SET_INSERT_VALUE, { key, value });
        },

        insert( { dispatch, commit, state } ) {
            u.clog('insert()');
//            commit('isLoading', true);
            commit(IS_LOADING, true);

            const url = '/api/v1/member';

            const params = {
                name: state.insertValues.name,
                description: state.insertValues.description
            };

            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

                    const data = response.data;
                    data.isShow = true;

                    commit('member/ADD', {
                        id: data.id,
                        member: data
                    }, { root: true } );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success add member',
                        isImportant: false
                    }, { root: true });

//                    commit('isLoading', false);
//                    commit('reset');
                    commit(IS_LOADING, false);
                    commit(RESET);
                })

                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed add member',
                        isImportant: false
                    }, { root: true });

//                    commit('isLoading', false);
//                    commit('reset');
                    commit(IS_LOADING, false);
                    commit(RESET);
                });
        },

        reset( { commit } ) {
//            commit('reset');
            commit(RESET);
        }
    },

    mutations: {
//        isLoading( state, value ) {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

//        setInsertValue( state, { key, value } ) {
        [SET_INSERT_VALUE]( state, { key, value } ) {
            state.insertValues[key] = value;
        },

//        reset( state ) {
        [RESET]( state ) {
            state.isLoading = false;
            Object.keys(state.insertValues).forEach(function(key) {
                this[key] = '';
            }, state.insertValues );
        }
    }
};
