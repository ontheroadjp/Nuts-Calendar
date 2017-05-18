export default {
    namespaced: true,

    state: {
        isLoading: false,
        isDropped: false,
        isInTrash: false,
        draggingItem: '',
        fromCell: {
            cellAddress: '',
            dayIndex: '',
            memberId: '',
            cellItems: '',
            itemIndex: '',
        },
        enterCell: {
            cellAddress: '',
            dayIndex: '',
            memberId: '',
            cellItems: '',
        },
        style: {
            dragStart: {
                opacity: '0.4',
            }
        },
        onMiniCal: ''
    },

    actions: {
        dragStart( { commit, rootGetters }, { draggingItem } ) {

            const dayIndex = draggingItem.dayIndex;
            const memberId = draggingItem.member_id;

            commit('dragStart', {
                dayIndex: dayIndex,
                memberId: memberId,
                cellAddress: rootGetters.getCellAddress(dayIndex, memberId),
                cellItems: rootGetters.getCellItems(dayIndex, memberId),
                itemIndex: draggingItem.itemIndex,
                draggingItem: draggingItem
            });
        },

        dragEnter( { state, commit, rootGetters }, { dayString, memberId } ) {
            const dayIndex = rootGetters.getRowIndex(dayString);
            commit('dragEnter', {
                dayIndex: dayIndex,
                memberId: memberId,
                cellAddress: rootGetters.getCellAddress(dayIndex, memberId),
                cellItems: rootGetters.getCellItems(dayIndex, memberId)
            });
        },

        dragOver( { state }, { e } ) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move'

            return false;
        },

        drop( { state, commit, rootState } ) {
            if(state.fromCell.cellAddress === state.enterCell.cellAddress) {
                u.clog('dnd canceled');
                return;
            }

            u.clog('drop()');

            const y = rootState.calendar.currentYear;
            const m = rootState.calendar.currentMonth;
            commit('drop', { y, m });

            const url = '/api/v1/item/' + state.draggingItem.id;
            const params = {
                'member_id': state.draggingItem.member_id,
                'content': state.draggingItem.content,
                'start_time': state.draggingItem.start_time,
                'end_time': state.draggingItem.end_time,
                'date': state.draggingItem.date
            };
    
            http.fetchPut(url, params)
                .then(response => {
                    u.clog('success');
                    commit('dragEnd');
                })
                .catch(error => {
                    u.clog('failed');
                    commit('reverseItem', { y, m });
                    commit('dragEnd');
                });
        },

        dropInTrash( { state } ) {
//            this.deleteItem.isLoading = true;
//            this.dragItem.isInTrash = true;
//
//            this.removeItem(
//                this.dragItem.fromCell.cellItems, 
//                this.dragItem.fromCell.itemIndex,
//                this.dragItem.draggingItem, 
//            );
        },

        setOnMiniCal( { commit }, { value } ) {
            console.log(value);
            commit('setOnMiniCal', { value });
        },

        dragEnd( { state, commit } ) {
            if( !state.isLoading ) {
                commit('dragEnd');
            }
        }
    },

    mutations: {
        dragStart( state, p ) {
            state.fromCell.cellAddress = p.cellAddress,
            state.fromCell.dayIndex = p.dayIndex,
            state.fromCell.memberId = p.memberId,
            state.fromCell.cellItems = p.cellItems,
            state.fromCell.itemIndex = p.itemIndex,
            state.draggingItem = p.draggingItem
        },

        dragEnter( state, p ) {
            state.enterCell.cellAddress = p.cellAddress;
            state.enterCell.cellItems = p.cellItems;
            state.enterCell.dayIndex = p.dayIndex;
            state.enterCell.memberId = p.memberId;
            state.onMiniCal = '';
        },

        drop( state, { y, m } ) {
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

        reverseItem( state, { y, m } ) {
            // update item
            state.draggintItem.date = y + '-' + m + '-' + (state.fromCell.dayIndex + 1);
            state.draggingItem.member_id = state.fromCell.memberId;

            // remove item
            state.enterCell.cellItems.splice(state.enterCell.itemIndex, 1);

            // add item
            state.fromCell.cellItems.push(state.draggingItem);
        },

        setOnMiniCal( state, { value } ) {
            u.clog('setOnMiniCal(' + value + ')');
            state.onMiniCal = value;
            state.enterCell.cellAddress = '';
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
        },

        dragEnd( state ) {
            state.isLoading = false;
            state.isDropped = false;
            state.enterTrash = false;
            state.draggingItem = '';
            state.fromCell.cellAddress = '';
            state.fromCell.dayIndex = '';
            state.fromCell.memberId = '';
            state.fromCell.cellItems = '';
            state.fromCell.itemIndex = '';
            state.enterCell.cellAddress = '';
            state.enterCell.dayIndex = '';
            state.enterCell.memberId = '';
            state.enterCell.cellItems = '';
            state.onMiniCal = '';
        }
    }
}
