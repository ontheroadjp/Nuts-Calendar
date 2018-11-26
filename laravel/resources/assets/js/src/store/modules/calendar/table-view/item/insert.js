import {
    PREPARE, IS_LOADING, SET_VALUE, INSERT, RESET, NOTIFY_SUCCESS, NOTIFY_DANGER
} from '../../../../mutation-types.js';

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
            commit(PREPARE, { dayIndex, memberId, cellItems });
        },

        setValue( { commit }, { key, value } ) {
            commit(SET_VALUE, { key, value } );
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
                commit(NOTIFY_DANGER, {
                    content: 'no content',
                    isImportant: false
                }, { root: true });
                return;
            }

            commit(IS_LOADING, true);

            const url = '/api/v1/item';
            const params = {
                'type_id': typeId,
                'row_index': state.enterCell.dayIndex,
                'member_id': state.enterCell.memberId,
                'content': state.newItem.content,
                'start_time': '00:00:00',
                'end_time': '00:00:00',
                'is_all_day': true,
                'memo': ''
            };

            if( rootState.calendar.viewMode === 'dayly' ) {
                const y = rootState.calendar.currentYear;
                const m = rootState.calendar.currentMonth;
                const d = ("0" + (state.enterCell.dayIndex + 1)).slice(-2);
                params.date = y + '-' + m + '-' + d;
            }

            http.fetchPost(url, params)
                .then(response => {
                    commit(INSERT, {
                        item: response.data
                    });

                    dispatch('calendar/tableView/updateCellItems',
                        state.enterCell.cellItems, { root: true }
                    );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success add task',
                        isImportant: false
                    }, { root: true });

                    commit(IS_LOADING, false);
                    commit(RESET);
                })
                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed add task',
                        isImportant: false
                    }, { root: true });

                    commit(IS_LOADING, false);
                    commit(RESET);
                });
        },

        reset( { commit } ) {
            commit(RESET);
        }
    },

    mutations: {
        [PREPARE]( state, { dayIndex, memberId, cellItems } ) {
            state.enterCell.dayIndex = dayIndex;
            state.enterCell.memberId = memberId;
            state.enterCell.cellItems = cellItems;
            state.isActive = true;
        },

        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [SET_VALUE]( state, { key, value } ) {
            state.newItem[key] = value;
        },

        [INSERT]( state, { item } ) {
            state.enterCell.cellItems.push(item);
        },

        [RESET]( state ) {
            state.isActive = false;
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
            state.newItem.content = '';
            state.error.isError = false;
            state.error.message = '';
        }
    }
}
