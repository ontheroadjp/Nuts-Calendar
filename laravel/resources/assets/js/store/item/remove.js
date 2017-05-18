export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        cellItems: '',
        deletingItem: ''
    },

    actions: {
        prepare( { commit, rootGetters }, { deletingItem } ) {
            u.clog('prepare()');

            const cellItems = rootGetters.getCellItems( 
                deletingItem.dayIndex, 
                deletingItem.member_id
            );

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
