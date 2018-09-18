import {
    PREPARE,
    SET_VALUE,
    SET_UPDATE_VALUE,
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER,
    RESET
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isLoading: false,
        editingUserCalendar: '',
        updateValues: {
            id: '',
            name: '',
            description: ''
        }
    },

    actions: {
        prepare( { commit }, { userCalendar } ) {
            commit(PREPARE, { userCalendar });
        },

        setUpdateValue( { commit }, { key, value } ) {
            commit(SET_UPDATE_VALUE, { key, value } );
        },

        update( { state, commit }, notify = true) {
            commit(IS_LOADING, true);

            const url = '/api/v1/calendar/' + state.updateValues.id;
            const data = {
                'name': state.updateValues.name,
                'description': state.updateValues.description
            };

            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    const id = response.data.id;
                    const name = response.data.name;
                    const description = response.data.description;

                    commit('userCalendar/SET_VALUE', {
                        id: id,
                        key: 'name',
                        value: name
                    }, { root: true });

                    commit('userCalendar/SET_VALUE', {
                        id: id,
                        key: 'description',
                        value: description
                    }, { root: true });

                    if( notify ) {
                        commit(NOTIFY_SUCCESS, {
                            content: 'success update User Calendar',
                            isImportant: false
                        }, { root: true});
                    }

                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed update User Calendar',
                        isActive: true
                    }, { root: true});

                    commit(IS_LOADING, false);
                });
        },

        reset: function( { commit } ) {
            commit(RESET);
        }
    },

    mutations: {
        [PREPARE]( state, { userCalendar } ) {
            state.editingUserCalendar = userCalendar;

            Object.keys(state.updateValues).forEach(function(key) {
                this[key] = userCalendar[key];
            }, state.updateValues );
        },

        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [SET_UPDATE_VALUE]( state, { key, value } ) {
            state.updateValues[key] = value;
        },

        [RESET]( state ) {
            state.isLoading = false;
            state.editingUserCalendar = '';
            state.updateValues.id = '';
            state.updateValues.name = '';
            state.updateValues.description = '';
        }
    }
};
