export default {
    namespaced: true,

    state: {
        isLoading: {
            name: false,
            description: false
        },

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

//        updateName( { commit, dispatch } ) {
//            commit('start', { key: 'name' });
//            dispatch('update');
//        },
//
//        updateDescription( { commit, dispatch } ) {
//            commit('start', { key: 'description' });
//            dispatch('update');
//        },

        update( { state, commit, rootState }, notify = true) {

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

                    commit('stop');
                })

                .catch( error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed update User Calendar',
                        isActive: true
                    }, { root: true});

                    commit('stop');
                });
        }
    },

    mutations: {
        prepare( state, { userCalendar } ) {
            Object.keys(state.updateValues).forEach(function(key) {
                this[key] = userCalendar[key];
            }, state.updateValues );
        },

        start( state, { key } ) {
            state.isLoading[key] = true;
        },

        setUpdateValue( state, { key, value } ) {
            state.updateValues[key] = value;
        },

        stop( state ) {
            Object.keys(state.isLoading).forEach(function(key) {
                this[key] = false;
            }, state.isLoading );
        }
    }
}
