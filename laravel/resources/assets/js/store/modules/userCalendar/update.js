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

        updateName( { commit, dispatch } ) {
            commit('start', { key: 'name' });
            dispatch('update');
        },

        updateDescription( { commit, dispatch } ) {
            commit('start', { key: 'description' });
            dispatch('update');
        },

        update( { state, commit, rootState } ) {

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

                    commit('userCalendar/setName', { id, name }, { root: true });
                    commit('userCalendar/setDescription', { id, description }, { root: true });

                    commit('notifySuccess', {
                        content: 'success update User Calendar',
                        isImportant: false
                    }, { root: true});

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
//            state.updateValues.id = userCalendar.id;
//            state.updateValues.name = userCalendar.name;
//            state.updateValues.description = userCalendar.description;
        },

        start( state, { key } ) {
            state.isLoading[key] = true;
        },

        setUpdateValue( state, { key, value } ) {
            state.updateValues[key] = value;
        },

//        setName( state, { value }) {
//            state.updateValues.name = value;
//        },
//
//        setDescription( state, { value }) {
//            state.updateValues.description = value;
//        },

        stop( state ) {
            Object.keys(state.isLoading).forEach(function(key) {
                this[key] = false;
            }, state.isLoading );
        }
    }
}
