export default {
    namespaced: true,

    state: {
        editingMember: '',
        isLoading: false,
        updateValues: {
            id: '',
            name: '',
            description: '',
            isShow: true
        }
    },

    actions: {
//        prepare( { commit }, { id, name, isShow } ) {
//            commit('prepare', { id, name, isShow } );
//        },

        prepare( { commit }, { editingMember, isShow } ) {
            commit('prepare', { editingMember, isShow } );
        },

        setUpdateValue( { commit }, { key, value } ) {
            commit('setUpdateValue', { key, value } );
        },

        update( { state, commit, rootState } ) {
            u.clog('update()');
            commit('isLoading', true);

            const url = '/api/v1/member/' + state.updateValues.id;
            const data = {
                'name': state.updateValues.name,
                'description': state.updateValues.description,
            };

            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    commit('member/setValue', {
                        id: response.data.id,
                        key: 'name',
                        name: response.data.name
                    }, { root: true });

                    commit('notifySuccess', {
                        content: 'success update member',
                        isImportant: false
                    }, { root: true});

                    commit('isLoading', false);
                    commit('reset');
                })

                .catch( error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

                    commit('isLoading', false);
                    commit('reset');
                });
        },

        reset({ commit }) {
            commit('reset');
        }
    },

    mutations: {
        isLoading( state, value ) {
            state.isLoading = value;
        },

//        prepare( state, { id, name, isShow } ) {
//            state.updateValues.id = id;
//            state.updateValues.name = name;
//            state.updateValues.isShow = isShow;
//        },

        prepare( state, { editingMember, isShow } ) {
            state.editingMember = editingMember;
            state.updateValues.id = editingMember.id;
            state.updateValues.name = editingMember.name;
            state.updateValues.isShow = isShow;
        },

        setUpdateValue( state, { key, value } ) {
            state.updateValues[key] = value;
        },

        reset( state ) {
            state.editingMember = '';
            state.isLoading = false;
            Object.keys(state.updateValues).forEach(function(key) {
                this[key] = '';
            }, state.updateValues );
        }
    }
};
