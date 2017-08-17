export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        enterCell: {
            dayIndex: '',
            memberId: '',
            cellItems: ''
        },
        newItem: {
            content: ''
        },
        error: {
            isError: false,
            message: ''
        }
    },

    actions: {
        prepare( { commit, rootGetters }, { dayIndex, memberId } ) {
            const cellItems = rootGetters.getCellItems(dayIndex, memberId);
            commit('prepare', { dayIndex, memberId, cellItems });
        },

        setContent( { commit }, { value } ) {
            commit('setContent', { value } );
        },

        insertEvent( { commit, dispatch } ) {
            dispatch('insert', { typeId: 1 } );
        },

        insertTask( { commit, dispatch } ) {
            dispatch('insert', { typeId: 2 });
        },

        insert( { state, commit, rootState }, { typeId } ) {
            u.clog('insertItem()');

            if( ! state.newItem.content ) {
                commit('notifyDanger', {
                    content: 'no content',
                    isImportant: false
                }, { root: true });
                return;
            }

            commit('start');

            const y = rootState.calendar.currentYear;
            const m = rootState.calendar.currentMonth;
            const d = ("0" + (state.enterCell.dayIndex + 1)).slice(-2);

            const url = '/api/v1/item';
            const params = {
                'date': y + '-' + m + '-' + d,
                'type_id': typeId,
                'member_id': state.enterCell.memberId,
                'content': state.newItem.content,
                'start_time': null,
                'end_time': null
            };
    
            http.fetchPost(url, params)
                .then(response => {
                    commit('insert', {
                        item: response.data
                    });

                    commit('notifySuccess', {
                        content: 'success add task',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                })
                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed add task',
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
        prepare( state, { dayIndex, memberId, cellItems } ) {
            state.enterCell.dayIndex = dayIndex;
            state.enterCell.memberId = memberId;
            state.enterCell.cellItems = cellItems;
            state.isActive = true;
        },
    
        setContent( state, { value } ) {
            state.newItem.content = value;
        },
    
        start( state ) {
            state.isLoading = true;
        },
    
        insert( state, { item } ) {
            state.enterCell.cellItems.push(item);
        },
    
        reset( state ) {
            state.isActive = false;
            state.isLoading = false;
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
            state.newItem.content = '';
            state.error.isError = false;
            state.error.message = '';
        }
    }
}
