//import Vue from 'vue';

export default {
    namespaced: true,

    state: {
//        isActive: false,
        isLoading: false,
        insertValues: {
            name: ''
        }
//        input: {
//            newName: ''
//        }
    },

    actions: {
//        prepare( { commit } ) {
//            commit('prepare'); 
//        },

        setInsertValue( { commit }, { key, value } ) {
            commit('setInsertValue', { key, value });
        },

        insert( { dispatch, commit, state } ) {
            u.clog('insert()');
            commit('start');

            const url = '/api/v1/member';
            
            const params = {
//                'name': state.input.newName,
                'name': state.insertValues.name,
            };
            
            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

//                    const members = rootState.member.data.members;
                    const data = response.data;
                    data.isShow = true;

                    commit('member/add', { 
                        id: data.id,
                        member: data
                    }, { root: true } );

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
//        prepare( state ) {
//            state.isActive = true;  
//        },
    
//        setNewName( state, { value } ) {
////            state.input.newName = value;
//            state.insertValues.name = value;
//        },
    
        setInsertValue( state, { key, value } ) {
            state.insertValues[key] = value;
        },

        start( state ) {
            state.isLoading = true;
        },
    
//        insert( state, { members, data } ) {
//            data.isShow = true;
////            const key = parseInt(members.length);
//            Vue.set(members, data.id, data);
//        },

        reset( state ) {
            state.isLoading = false;
//            state.isActive = false;
//            state.input.newName = '';
            Object.keys(state.insertValues).forEach(function(key) {
                this[key] = '';
            }, state.insertValues );
        }
    }
};
