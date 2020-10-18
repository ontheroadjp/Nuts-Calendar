import {
    PREPARE,
    DUPLICATE_PREPARE,
    IS_LOADING,
    SET_VALUE,
    INSERT,
    RESET,
    NOTIFY_SUCCESS,
    NOTIFY_DANGER,
    ADD
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        enterCell: {
            rowIndex: '',
            memberId: '',
            cellItems: ''
        },
        newItem: {
            content: ''
        },
        duplicatingItem: '',
        error: {
            isError: false,
            message: ''
        }
    },

    actions: {
        prepare( { commit, rootGetters }, { rowIndex, memberId, cellItems } ) {
            u.clog('prepare() @vuex item/insert');
            commit(PREPARE, { rowIndex, memberId, cellItems });
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
            const now = new Date();
            const params = {
                'date': state.enterCell.rowIndex,
                'user_id': rootState.user.data.user.id,
                'type_id': typeId,
                'row_index': state.enterCell.rowIndex,
                'member_id': state.enterCell.memberId,
                'content': state.newItem.content,
                'start_time': now.getHours() + ':00',
                'end_time': now.getHours() + ':30',
                'rrule_id': '',
                'is_all_day': true,
                'is_done': false,
                'memo': ''
            };

            http.fetchPost(url, params)
                .then(response => {
                    commit('item/ADD',
                        { id: response.data.id, item: response.data },
                        { root: true }
                    );

                    commit(INSERT, { calItem: { id: response.data.id } });

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

        duplicate( { state, dispatch, commit, rootState }, { item, cellItems } ) {
            u.clog('duplicate()');
            commit(DUPLICATE_PREPARE, {
                rowIndex: item.row_index,
                memberId: item.member_id,
                cellItems: cellItems,
                duplicatingItem: item
            });

            if( !item.row_index || !item.member_id || !item.content || !item.type_id ) {
                commit(NOTIFY_DANGER, {
                    content: 'invalid item',
                    isImportant: false
                }, { root: true });
                return;
            }

            commit(IS_LOADING, true);

            const url = '/api/v1/item';
            const now = new Date();
            const params = {
                'date': item.date,
                'user_id': rootState.user.data.user.id,
                'type_id': item.type_id,
                'row_index': item.row_index,
                'member_id': item.member_id,
                'content': item.content + ' copy',
                'start_time': item.start_time,
                'end_time': item.end_time,
                'rrule_id': '',
                'is_all_day': item.is_all_day,
                'is_done': false,
                'memo': item.memo
            };

            http.fetchPost(url, params)
                .then(response => {
                    commit('item/ADD',
                        { id: response.data.id, item: response.data },
                        { root: true }
                    );

                    commit(INSERT, { calItem: { id: response.data.id } });

                    dispatch('calendar/tableView/updateCellItems',
                        state.enterCell.cellItems, { root: true }
                    );

                    commit(NOTIFY_SUCCESS, {
                        content: 'success duplicate item',
                        isImportant: false
                    }, { root: true });

                    commit(IS_LOADING, false);
                    commit(RESET);
                })
                .catch(error => {
                    u.clog('failed');

                    commit(NOTIFY_DANGER, {
                        content: 'failed duplicate item',
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
        [PREPARE]( state, { rowIndex, memberId, cellItems } ) {
            state.enterCell.rowIndex = rowIndex;
            state.enterCell.memberId = memberId;
            state.enterCell.cellItems = cellItems;
            state.isActive = true;
        },

        [DUPLICATE_PREPARE]( state, { rowIndex, memberId, cellItems, duplicatingItem } ) {
            state.enterCell.rowIndex = rowIndex;
            state.enterCell.memberId = memberId;
            state.enterCell.cellItems = cellItems;
            state.duplicatingItem = duplicatingItem;
            state.isActive = true;
        },

        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [SET_VALUE]( state, { key, value } ) {
            state.newItem[key] = value;
        },

        [INSERT]( state, { calItem } ) {
            state.enterCell.cellItems.push(calItem);
        },

        [RESET]( state ) {
            state.isActive = false;
            state.enterCell.rowIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
            state.newItem.content = '';
            state.error.isError = false;
            state.duplicatingItem = '';
            state.error.message = '';
        }
    }
}