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
            commit('setInsertValue', { key, value });
        },

        insert( { dispatch, commit, state }, { notify, successCb, failedCb } ) {
            u.clog('insert()');
            commit('isLoading', true);

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

                    if(notify !== false) {
                        commit('notifySuccess', {
                            content: 'success add calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    commit('isLoading', false);

                    if( typeof successCb === 'function' ) {
                        successCb();
                    }

                    commit('reset');
                })

                .catch(error => {
                    u.clog('failed');

                    if(notify !== false) {
                        commit('notifyDanger', {
                            content: 'failed add calendar',
                            isImportant: false
                        }, { root: true });
                    }

                    commit('isLoading', false);

                    if( typeof failedCb === 'function' ) {
                        failedCb();
                    }

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        isLoading( state, value ) {
            state.isLoading = value;
        },

        setInsertValue( state, { key, value } ) {
            state.insertValues[key] = value;
        },

        reset( state ) {
            Object.keys(state.insertValues).forEach(function(key) {
                this[key] = '';
            }, state.insertValues );
        }
    }
};
