import {
    DRAG_START,
    DRAG_ENTER,
    DRAG_OVER,
    DROP,
    REVERSE_ITEM,
    SET_ON_MINI_CAL,
    DRAG_END
} from '../../../../mutation-types.js'

export default {
    namespaced: true,

    state: {
        isLoading: false,
        isDropped: false,
        draggingItem: '',
        fromCell: {
            cellAddress: '',
            rowIndex: '',
            memberId: '',
            cellItems: '',
            itemIndex: ''
        },
        enterCell: {
            cellAddress: '',
            rowIndex: '',
            memberId: '',
            cellItems: ''
        },
        style: {
            dragStart: {
                opacity: '0.4'
            }
        },
        onMiniCal: ''
    },

    actions: {
        dragStart( { commit, rootGetters }, { cellItems, draggingItem } ) {

            const rowIndex = draggingItem.dayIndex;
            const memberId = draggingItem.member_id;

            commit(DRAG_START, {
                rowIndex: rowIndex,
                memberId: memberId,
                cellAddress: rootGetters.getCellAddress(rowIndex, memberId),
                cellItems: cellItems,
                itemIndex: draggingItem.itemIndex,
                draggingItem: draggingItem
            });
        },

        dragEnter( { state, commit, rootGetters }, { rowIndex, memberId, cellItems } ) {
            commit(DRAG_ENTER, {
                rowIndex: rowIndex,
                memberId: memberId,
                cellAddress: rootGetters.getCellAddress(rowIndex, memberId),
                cellItems: cellItems
            });
        },

        dragOver( { state }, { e } ) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            return false;
        },

        drop( { state, dispatch, commit, rootState } ) {
            u.clog('drop()');
            if(state.fromCell.cellAddress === state.enterCell.cellAddress) return;

            const y = rootState.calendar.currentYear;
            const m = rootState.calendar.currentMonth;
            const viewMode = rootState.calendar.viewMode;
            commit(DROP, { y, m, viewMode });

            // update cellItems
            dispatch('calendar/tableView/updateCellItems',
                state.enterCell.cellItems, { root: true }
            );

            dispatch('calendar/tableView/updateCellItems',
                state.fromCell.cellItems, { root: true }
            );

//            if( rootState.calendar.viewMode === 'monthly' ) {
//                state.draggingItem.date = null;
//            }

            const url = '/api/v1/item/' + state.draggingItem.id;
            const params = {
                'member_id': state.draggingItem.member_id,
                'content': state.draggingItem.content,
                'is_all_day': state.draggingItem.is_all_day,
                'start_time': state.draggingItem.start_time,
                'end_time': state.draggingItem.end_time,
                'is_done': state.draggingItem.is_done,
                'row_index': state.draggingItem.row_index,
                'date': state.draggingItem.date
            };

            http.fetchPut(url, params)
                .then(response => {
                    u.clog('success');
                    commit(DRAG_END);
                })
                .catch(error => {
                    u.clog('failed');
                    commit(REVERSE_ITEM, { y, m });

                    commit('calendar/tableView/SORT_CELL_ITEMS',
                        state.enterCell.cellItems,
                        { root: true }
                    );

                    commit('calendar/tableView/SORT_CELL_ITEMS',
                        state.fromCell.cellItems,
                        { root: true }
                    );

                    commit(DRAG_END);
                });
        },

        setOnMiniCal( { commit }, { value } ) {
            commit(SET_ON_MINI_CAL, { value });
        },

        dragEnd( { state, commit } ) {
            if( !state.isLoading ) {
                commit(DRAG_END);
            }
        }
    },

    mutations: {
        [DRAG_START]( state, p ) {
            state.fromCell.cellAddress = p.cellAddress;
            state.fromCell.rowIndex = p.rowIndex;
            state.fromCell.memberId = p.memberId;
            state.fromCell.cellItems = p.cellItems;
            state.fromCell.itemIndex = p.itemIndex;
            state.draggingItem = p.draggingItem;
        },

        [DRAG_ENTER]( state, p ) {
            state.enterCell.cellAddress = p.cellAddress;
            state.enterCell.rowIndex = p.rowIndex;
            state.enterCell.memberId = p.memberId;
            state.enterCell.cellItems = p.cellItems;
            state.onMiniCal = '';
        },

        [DROP]( state, { y, m, viewMode } ) {
            state.isLoading = true;
            state.isDropped = true;

            // update item
            if( viewMode === 'dayly' ) {
//                state.draggingItem.date = y + '-' + m + '-' + (state.enterCell.rowIndex + 1);
                const d = (state.enterCell.rowIndex).slice(-2);
                state.draggingItem.date = y + '-' + m + '-' + d;
            } else if( viewMode === 'monthly' ) {
                state.draggingItem.date = null;
            }
            state.draggingItem.member_id = state.enterCell.memberId;
            state.draggingItem.row_index = state.enterCell.rowIndex;

            // remove item
            state.fromCell.cellItems.splice(state.fromCell.itemIndex, 1);

            // add item
            state.enterCell.cellItems.push(state.draggingItem);
        },

        [REVERSE_ITEM]( state, { y, m } ) {
            // update item
            state.draggingItem.date = y + '-' + m + '-' + (state.fromCell.rowIndex + 1);
            state.draggingItem.member_id = state.fromCell.memberId;

            // remove item
            state.enterCell.cellItems.splice(state.enterCell.itemIndex, 1);

            // add item
            state.fromCell.cellItems.push(state.draggingItem);
        },

        [SET_ON_MINI_CAL]( state, { value } ) {
            u.clog('setOnMiniCal(' + value + ')');
            state.onMiniCal = value;
            state.enterCell.cellAddress = '';
            state.enterCell.rowIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = [];
        },

        [DRAG_END]( state ) {
            state.isLoading = false;
            state.isDropped = false;
            state.draggingItem = '';
            state.fromCell.cellAddress = '';
            state.fromCell.rowIndex = '';
            state.fromCell.memberId = '';
            state.fromCell.cellItems = [];
            state.fromCell.itemIndex = '';
            state.enterCell.cellAddress = '';
            state.enterCell.rowIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = [];
            state.onMiniCal = '';
        }
    }
};
