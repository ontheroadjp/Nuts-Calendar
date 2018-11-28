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
        prepare( { commit }, { editingMember, isShow } ) {
            commit(PREPARE, { editingMember, isShow } );
        },

        setUpdateValue( { commit }, { key, value } ) {
            commit(SET_UPDATE_VALUE, { key, value } );
        },

        update( { state, commit, rootState } ) {
            u.clog('update()');
            commit(IS_LOADING, true);

//            const url = '/api/v1/member/' + state.updateValues.id;
//            const data = {
//                'name': state.updateValues.name,
//                'description': state.updateValues.description,
//            };
//
//            http.fetchPut(url, data)
//                .then( response => {
//                    u.clog('success');
//
//                    commit('member/SET_VALUE', {
//                        id: response.data.id,
//                        key: 'name',
//                        value: response.data.name
//                    }, { root: true });
//
//                    commit('member/SET_VALUE', {
//                        id: response.data.id,
//                        key: 'description',
//                        value: response.data.description
//                    }, { root: true });
//
//                    commit(NOTIFY_SUCCESS, {
//                        content: 'success update member',
//                        isImportant: false
//                    }, { root: true});
//
//                    commit(IS_LOADING, false);
//                })
//
//                .catch( error => {
//                    u.clog('failed');
//
//                    commit(NOTIFY_DANGER, {
//                        content: 'failed update member',
//                        isActive: true
//                    }, { root: true});
//
//                    commit(IS_LOADING, false);
//                });
        },

        reset({ commit }) {
            commit(RESET);
        }
    },

    mutations: {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [PREPARE]( state, { editingMember, isShow } ) {
            state.editingMember = editingMember;
            state.updateValues.id = editingMember.id;
            state.updateValues.name = editingMember.name;
            state.updateValues.description = editingMember.description;
            state.updateValues.isShow = isShow;
        },

        [SET_UPDATE_VALUE]( state, { key, value } ) {
            state.updateValues[key] = value;
        },

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
