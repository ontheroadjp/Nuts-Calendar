import { PREPARE, IS_LOADING, REMOVE, NOTIFY_SUCCESS, NOTIFY_DANGER, RESET } from '../../../../mutation-types.js';

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
            commit(PREPARE, { cellItems, deletingItem } );
        },

        remove( { state, commit, dispatch } ) {
            u.clog('removeItem()');

            commit(IS_LOADING, true);
            const url = '/api/v1/item/' + state.deletingItem.id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit(REMOVE);

                    dispatch('calendar/tableView/updateCellItems',
                        state.cellItems, { root: true }
                    );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success remove item',
                        isImportant: false
                    }, { root: true });

                    commit(RESET);
                })

                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed remove item',
                        isImportant: false
                    }, { root: true });

                    commit(RESET);
                });
        },

        reset( { commit } ) {
            commit(RESET);
        }
    },

    mutations: {
        [PREPARE]( state, { cellItems, deletingItem } ) {
            state.cellItems = cellItems;
            state.deletingItem = deletingItem;
            state.isActive = true;
        },

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
