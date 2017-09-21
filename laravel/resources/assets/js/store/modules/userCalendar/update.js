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
            commit('prepare',{ userCalendar });
        },

        setUpdateValue( { commit }, { key, value } ) {
            commit('setUpdateValue', { key, value } );
        },

        update( { state, commit, rootState }, notify = true) {
            commit('isLoading', true);

            const url = '/api/v1/calendar/' + state.updateValues.id;
            const data = {
                'name': state.updateValues.name,
                'description': state.updateValues.description,
            };

            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    const id = response.data.id;
                    const name = response.data.name;
                    const description = response.data.description;

                    commit('userCalendar/setValue', {
                        id: id,
                        key: 'name',
                        value: name
                    }, { root: true });

                    commit('userCalendar/setValue', {
                        id: id,
                        key: 'description',
                        value: description
                    }, { root: true });

                    if( notify ) {
                        commit('notifySuccess', {
                            content: 'success update User Calendar',
                            isImportant: false
                        }, { root: true});
                    }

                    commit('isLoading', false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed update User Calendar',
                        isActive: true
                    }, { root: true});

                    commit('isLoading', false);
                });
        }
    },

    mutations: {
        prepare( state, { userCalendar } ) {
            state.editingUserCalendar = userCalendar;

            Object.keys(state.updateValues).forEach(function(key) {
                this[key] = userCalendar[key];
            }, state.updateValues );
        },

        isLoading( state, value ) {
            state.isLoading = value;
        },

//        start( state, { key } ) {
//            state.isLoading[key] = true;
//        },

        setUpdateValue( state, { key, value } ) {
            state.updateValues[key] = value;
        },

//        stop( state ) {
//            Object.keys(state.isLoading).forEach(function(key) {
//                this[key] = false;
//            }, state.isLoading );
//        }
    }
}
