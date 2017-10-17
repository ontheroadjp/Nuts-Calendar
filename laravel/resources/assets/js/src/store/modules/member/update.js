import {
    PREPARE,
    SET_UPDATE_VALUE,
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER,
    RESET
} from '../../mutation-types.js';

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
//            commit('prepare', { editingMember, isShow } );
            commit(PREPARE, { editingMember, isShow } );
        },

        setUpdateValue( { commit }, { key, value } ) {
//            commit('setUpdateValue', { key, value } );
            commit(SET_UPDATE_VALUE, { key, value } );
        },

        update( { state, commit, rootState } ) {
            u.clog('update()');
//            commit('isLoading', true);
            commit(IS_LOADING, true);

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
                        value: response.data.name
                    }, { root: true });

                    commit('member/setValue', {
                        id: response.data.id,
                        key: 'description',
                        value: response.data.description
                    }, { root: true });

                    commit(NOTIFY_SUCCESS, {
                        content: 'success update member',
                        isImportant: false
                    }, { root: true});

//                    commit('isLoading', false);
//                    commit('reset');
                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

//                    commit('isLoading', false);
//                    commit('reset');
                    commit(IS_LOADING, false);
                });
        },

        reset({ commit }) {
//            commit('reset');
            commit(RESET);
        }
    },

    mutations: {
//        isLoading( state, value ) {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

//        prepare( state, { id, name, isShow } ) {
//            state.updateValues.id = id;
//            state.updateValues.name = name;
//            state.updateValues.isShow = isShow;
//        },

//        prepare( state, { editingMember, isShow } ) {
        [PREPARE]( state, { editingMember, isShow } ) {
            state.editingMember = editingMember;
            state.updateValues.id = editingMember.id;
            state.updateValues.name = editingMember.name;
            state.updateValues.description = editingMember.description;
            state.updateValues.isShow = isShow;
        },

//        setUpdateValue( state, { key, value } ) {
        [SET_UPDATE_VALUE]( state, { key, value } ) {
            state.updateValues[key] = value;
        },

//        reset( state ) {
        [RESET]( state ) {
            state.editingMember = '';
            state.isLoading = false;
            Object.keys(state.updateValues).forEach(function(key) {
                this[key] = '';
            }, state.updateValues );
            state.updateValues.isShow = false;
        }
    }
};
