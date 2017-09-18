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
        prepare( { commit, rootGetters }, { dayIndex, memberId, cellItems } ) {
//            const cellItems = rootGetters.getCellItems(dayIndex, memberId);
            commit('prepare', { dayIndex, memberId, cellItems });
        },

        setValue( { commit }, { key, value } ) {
            commit('setValue', { key, value } );
        },

        insertEvent( { commit, dispatch } ) {
            dispatch('insert', { typeId: 1 } );
        },

        insertTask( { commit, dispatch } ) {
            dispatch('insert', { typeId: 2 });
        },

        insert( { state, dispatch, commit, rootState }, { typeId } ) {
            u.clog('insertItem()');

            if( ! state.newItem.content ) {
                commit('notifyDanger', {
                    content: 'no content',
                    isImportant: false
                }, { root: true });
                return;
            }

//            commit('start');
            commit('isLoading', true);

            const y = rootState.calendar.currentYear;
            const m = rootState.calendar.currentMonth;
            const d = ("0" + (state.enterCell.dayIndex + 1)).slice(-2);

            const url = '/api/v1/item';
            const params = {
                'date': y + '-' + m + '-' + d,
                'type_id': typeId,
                'member_id': state.enterCell.memberId,
                'content': state.newItem.content,
                'start_time': '00:00:00',
                'end_time': '00:00:00',
                'is_all_day': true,
                'memo': ''
            };

            http.fetchPost(url, params)
                .then(response => {
                    commit('insert', {
                        item: response.data
                    });

                    dispatch('calendar/tableView/updateCellItems', state.enterCell.cellItems, {
                        root: true
                    });

//                    commit('calendar/tableView/sortCellItems', state.enterCell.cellItems, {
//                        root: true
//                    });

                    commit('notifySuccess', {
                        content: 'success add task',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
                    commit('reset');
                })
                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed add task',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
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

        isLoading( state, value ) {
            state.isLoading = value;
        },

        setValue( state, { key, value } ) {
            state.newItem[key] = value;
        },

//        start( state ) {
//            state.isLoading = true;
//        },

        insert( state, { item } ) {
            state.enterCell.cellItems.push(item);
        },

        reset( state ) {
            state.isActive = false;
//            state.isLoading = false;
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
            state.newItem.content = '';
            state.error.isError = false;
            state.error.message = '';
        }
    }
}
