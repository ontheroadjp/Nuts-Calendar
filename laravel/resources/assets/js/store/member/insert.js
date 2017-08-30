import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        input: {
            newName: ''
        }
    },

    actions: {
        prepare( { commit } ) {
            commit('prepare'); 
        },

        setNewName( { commit }, { value } ) {
            commit('setNewName', { value });
        },

        insert( { dispatch, commit, state, rootState } ) {
            u.clog('insert()');
            commit('start');

//            const order = Object.keys(rootState.calendar.data.members).length + 1;
            const url = '/api/v1/member';
//            const params = {
//                'user_calendar_id': rootState.calendar.currentId,
//                'name': state.input.newName,
//                'order': order
//            };
            
            const params = {
                'name': state.input.newName,
            };
            
            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

//                    const calendars = rootState.calendar.data.calendars;
//                    const members = rootState.calendar.data.members;
//                    const memberId = response.data.id;
                    const data = response.data;
//                    commit('insert', { calendars, members, memberId, data } );
                    commit('insert', { data } );

                    commit('notifySuccess', {
                        content: 'success add member',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                })
                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed add member',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state ) {
            state.isActive = true;  
        },
    
        setNewName( state, { value } ) {
            state.input.newName = value;
        },
    
        start( state ) {
            state.isLoading = true;
        },
    
//        insert( state, { calendars, members, key, data } ) {
//            data.isShow = true;
//            Vue.set(members, key, data);
//            calendars.forEach( function(val, index) {
//                Vue.set( val.items, key, []);
//            });
//        },

        insert( state, { data } ) {
            data.isShow = true;
//            Vue.set(members, memberId, data);
//            calendars.forEach( function(val, index) {
//                Vue.set( val.items, memberId, []);
//            });
        },

        reset( state ) {
            state.isLoading = false;
            state.isActive = false;
            state.input.newName = '';
        }
    }
};
