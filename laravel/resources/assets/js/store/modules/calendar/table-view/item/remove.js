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
            commit('prepare', { cellItems, deletingItem } );
        },

        remove( { state, commit } ) {
            u.clog('removeItem()');

            commit('start');
            const url = '/api/v1/item/' + state.deletingItem.id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('remove');

                    dispatch('calendar/tableView/updateCellItems', state.cellItems, {
                        root: true
                    }),
//                    commit('calendar/tableView/sortCellItems', state.cellItems, {
//                        root: true
//                    }),
//
//                    commit('calendar/tableView/checkTime', state.cellItems, {
//                        root: true
//                    }),

                    commit('notifySuccess', {
                        content: 'success remove item',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove item',
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
        prepare( state, { cellItems, deletingItem } ) {
            state.cellItems = cellItems;
            state.deletingItem = deletingItem;
            state.isActive = true;
        },

        start( state ) {
            state.isLoading = true;
        },

        remove( state ) {
            state.cellItems.splice(state.deletingItem.itemIndex, 1);
        },

        reset( state ) {
            state.isActive = false,
            state.isLoading = false,
            state.cellItems = '';
            state.deletingItem = '';
        }
    }
}
