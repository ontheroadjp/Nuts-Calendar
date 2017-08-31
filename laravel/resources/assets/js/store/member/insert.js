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

            const url = '/api/v1/member';
            
            const params = {
                'name': state.input.newName,
            };
            
            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

                    const members = rootState.dashboard.data.members;
                    const data = response.data;
                    commit('insert', { members, data } );

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
    
        insert( state, { members, data } ) {
            data.isShow = true;
            const key = parseInt(members.length);
            Vue.set(members, key, data);
        },

        reset( state ) {
            state.isLoading = false;
            state.isActive = false;
            state.input.newName = '';
        }
    }
};
