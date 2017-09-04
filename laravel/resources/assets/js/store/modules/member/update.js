export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
//        editingMember: '',
        updateValues: {
            id: '',
            name: '',
            isShow: true
        }
//        input: {
//            name: '',
//            isShow: ''
//        }
    },

    actions: {
//        prepare( { commit }, { editingMember } ) {
//            commit('prepare', { editingMember } ); 
//        },

        prepare( { commit }, { id, name, isShow } ) {
            commit('prepare', { id, name, isShow } ); 
        },

        setName( { commit }, { value } ) {
            commit('setName', { value });
        },

        setIsShow( { commit }, { value } ) {
            commit('setIsShow', { value });
        },

        update( { state, commit, rootState } ) {
            u.clog('update()');
            commit('start');

//            const url = '/api/v1/member/' + state.editingMember.id;
            const url = '/api/v1/member/' + state.updateValues.id;
            const data = {
                'name': state.updateValues.name,
            };
    
            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

//                    commit('update', {
//                        'member': rootState.member.data.members[response.data.id],
//                        'name': response.data.name,
//                    });

                    commit('member/setName', {
                        id: response.data.id,
                        name: response.data.name
                    }, { root: true });

                    commit('notifySuccess', {
                        content: 'success update member',
                        isImportant: false
                    }, { root: true});

                    commit('reset');
                })

                .catch( error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
//        prepare( state, { editingMember } ) {
//            state.isActive = true;  
//            state.editingMember = editingMember;
//            state.updateValues.name = editingMember.name;
//            state.updateValues.isShow = editingMember.isShow;
//        },
    
        prepare( state, { id, name, isShow } ) {
            state.isActive = true;  
            state.updateValues.id = id;
            state.updateValues.name = name;
            state.updateValues.isShow = isShow;
        },
    
        setName( state, { value } ) {
            state.updateValues.name = value;
        },
    
        setIsShow( state, { value } ) {
            state.updateValues.isShow = value;
        },
    
        start( state ) {
            state.isLoading = true;
        },

//        update( state, { member, name } ) {
//            member.name = name;
//        },

        reset( state ) {
            state.isLoading = false;
            state.isActive = false;
            state.updateValues.name = '';
            state.updateValues.isShow = '';
        }
    }
};
