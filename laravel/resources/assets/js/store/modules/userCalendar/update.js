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
            commit('start', { property: 'name' });
            dispatch('update');
        },

        updateDescription( { commit, dispatch } ) {
            commit('start', { property: 'description' });
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
                    const uCal = rootState.dashboard.data.userCalendars[id];
                    const name = response.data.name;
                    const description = response.data.description;
                    commit('update', { uCal, name, description }); 

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
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state, { userCalendar } ) {
            state.updateValues.id = userCalendar.id;
            state.updateValues.name = userCalendar.name;
            state.updateValues.description = userCalendar.description;
        },

        start( state, { property } ) {
            state.isLoading[property] = true;
        },

        update( state, { uCal, name, description } ) {
            uCal.name = name;
            uCal.description = description;
        },

        setName( state, { value }) {
            state.updateValues.name = value;
        },

        setDescription( state, { value }) {
            state.updateValues.description = value;
        },

        stop( state ) {
            Object.keys(state.isLoading).forEach(function(key) {
                this[key] = false;
            }, state.isLoading );
        },

        reset( state ) {
        }
    }
}
