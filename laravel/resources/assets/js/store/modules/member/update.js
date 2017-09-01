export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        editingMember: '',
        input: {
            name: '',
//            order: '',
            isShow: ''
        }
    },

    actions: {
        prepare( { commit }, { editingMember } ) {
            commit('prepare', { editingMember } ); 
        },

        setName( { commit }, { value } ) {
            commit('setName', { value });
        },

        setIsShow( { commit }, { value } ) {
            commit('setIsShow', { value });
        },

//        setOrder( { commit }, { value } ) {
//            commit('setOrder', { value });
//        },

        update( { state, commit, rootState } ) {
            u.clog('update()');
            commit('start');

            const url = '/api/v1/member/' + state.editingMember.id;
            const data = {
                'name': state.input.name,
//                'order': state.input.order
            };
    
            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    commit('update', {
                        'member': rootState.calendar.data.members[response.data.id],
                        'name': response.data.name,
//                        'order': response.data.order
                    });

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
        prepare( state, { editingMember } ) {
            state.isActive = true;  
            state.editingMember = editingMember;
            state.input.name = editingMember.name;
//            state.input.order = editingMember.order;
            state.input.isShow = editingMember.isShow;
        },
    
        setName( state, { value } ) {
            state.input.name = value;
        },
    
        setIsShow( state, { value } ) {
            state.input.isShow = value;
        },
    
//        setOrder( state, { value } ) {
//            state.input.order = value;
//        },
    
        start( state ) {
            state.isLoading = true;
        },

//        update( state, { member, name, order } ) {
        update( state, { member, name } ) {
            member.name = name;
//            member.order = order;
        },

        reset( state ) {
            state.isLoading = false;
            state.isActive = false;
            state.input.name = '';
            state.input.isShow = '';
//            state.input.order = '';
        }
    }
};
