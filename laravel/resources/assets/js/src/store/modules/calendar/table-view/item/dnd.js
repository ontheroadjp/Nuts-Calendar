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
            dayIndex: '',
            memberId: '',
            cellItems: '',
            itemIndex: ''
        },
        enterCell: {
            cellAddress: '',
            dayIndex: '',
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

            const dayIndex = draggingItem.dayIndex;
            const memberId = draggingItem.member_id;

            commit(DRAG_START, {
                dayIndex: dayIndex,
                memberId: memberId,
                cellAddress: rootGetters.getCellAddress(dayIndex, memberId),
                cellItems: cellItems,
                itemIndex: draggingItem.itemIndex,
                draggingItem: draggingItem
            });
        },

//        dragEnter( { state, commit, rootGetters }, { dayString, memberId, cellItems } ) {
//            const dayIndex = rootGetters.getRowIndex(dayString);
//            commit(DRAG_ENTER, {
//                dayIndex: dayIndex,
//                memberId: memberId,
//                cellAddress: rootGetters.getCellAddress(dayIndex, memberId),
//                cellItems: cellItems
//            });
//        },

        dragEnter( { state, commit, rootGetters }, { rowIndex, memberId, cellItems } ) {
            commit(DRAG_ENTER, {
                dayIndex: rowIndex,
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
            commit(DROP, { y, m });

            // update cellItems
            dispatch('calendar/tableView/updateCellItems',
                state.enterCell.cellItems, { root: true }
            );

            dispatch('calendar/tableView/updateCellItems',
                state.fromCell.cellItems, { root: true }
            );

            const url = '/api/v1/item/' + state.draggingItem.id;
            const params = {
                'member_id': state.draggingItem.member_id,
                'content': state.draggingItem.content,
                'is_all_day': state.draggingItem.is_all_day,
                'start_time': state.draggingItem.start_time,
                'end_time': state.draggingItem.end_time,
                'is_done': state.draggingItem.is_done,
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
            state.fromCell.dayIndex = p.dayIndex;
            state.fromCell.memberId = p.memberId;
            state.fromCell.cellItems = p.cellItems;
            state.fromCell.itemIndex = p.itemIndex;
            state.draggingItem = p.draggingItem;
        },

        [DRAG_ENTER]( state, p ) {
            state.enterCell.cellAddress = p.cellAddress;
            state.enterCell.dayIndex = p.dayIndex;
            state.enterCell.memberId = p.memberId;
            state.enterCell.cellItems = p.cellItems;
            state.onMiniCal = '';
        },

        [DROP]( state, { y, m } ) {
            state.isLoading = true;
            state.isDropped = true;

            // update item
            state.draggingItem.date = y + '-' + m + '-' + (state.enterCell.dayIndex + 1);
            state.draggingItem.member_id = state.enterCell.memberId;

            // remove item
            state.fromCell.cellItems.splice(state.fromCell.itemIndex, 1);

            // add item
            state.enterCell.cellItems.push(state.draggingItem);
        },

        [REVERSE_ITEM]( state, { y, m } ) {
            // update item
            state.draggingItem.date = y + '-' + m + '-' + (state.fromCell.dayIndex + 1);
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
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = [];
        },

        [DRAG_END]( state ) {
            state.isLoading = false;
            state.isDropped = false;
            state.draggingItem = '';
            state.fromCell.cellAddress = '';
            state.fromCell.dayIndex = '';
            state.fromCell.memberId = '';
            state.fromCell.cellItems = [];
            state.fromCell.itemIndex = '';
            state.enterCell.cellAddress = '';
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = [];
            state.onMiniCal = '';
        }
    }
};
