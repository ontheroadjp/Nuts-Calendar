import { PREPARE, IS_LOADING, REMOVE, RESET } from '../../../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        cellItems: '',
        deletingItem: ''
    },

    actions: {
        prepare( { commit, dispatch, rootGetters }, { cellItems, deletingItem } ) {
            u.clog('prepare()');
//            commit('prepare', { cellItems, deletingItem } );
            commit(PREPARE, { cellItems, deletingItem } );
        },

        remove( { state, commit, dispatch } ) {
            u.clog('removeItem()');

//            commit('start');
//            commit('isLoading', true);
            commit(IS_LOADING, true);
            const url = '/api/v1/item/' + state.deletingItem.id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

//                    commit('remove');
                    commit(REMOVE);

                    dispatch('calendar/tableView/updateCellItems',
                        state.cellItems, { root: true }
                    );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success remove item',
                        isImportant: false
                    }, { root: true });

//                    commit('reset');
                    commit(RESET);
                })

                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed remove item',
                        isImportant: false
                    }, { root: true });

//                    commit('reset');
                    commit(RESET);
                });
        },

        reset( { commit } ) {
//            commit('reset');
            commit(RESET);
        }
    },

    mutations: {
//        prepare( state, { cellItems, deletingItem } ) {
        [PREPARE]( state, { cellItems, deletingItem } ) {
            state.cellItems = cellItems;
            state.deletingItem = deletingItem;
            state.isActive = true;
        },

//        start( state ) {
//            state.isLoading = true;
//        },

//        isLoading( state, value ) {
        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [REMOVE]( state ) {
            state.cellItems.splice(state.deletingItem.itemIndex, 1);
        },

        [RESET]( state ) {
            state.isActive = false,
            state.isLoading = false,
            state.cellItems = '';
            state.deletingItem = '';
        }
    }
}
