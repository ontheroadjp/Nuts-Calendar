import orderByStartTime from '../mixins/order-by-start-time.js';

export default {
    mixins: [
        orderByStartTime
    ],

    data() {
        return {
            addItem: {
                isLoading: false,
//                cellTo: '',
                newItemContent: '',
            },

//            editItem: {
//                isActive: false,
//                editingItem: null,
//            },

            deleteItem: {
                isLoading: false,
            },
        }
    },

    methods: {
        addItemToArray: function(cellItems, item) {
            cellItems.push(item);
        },

        removeItemFromArray: function(cellItems, itemIndex) {
            cellItems.splice(itemIndex, 1);
        },

        // insert
        insertEvent: function (memberId, day, cellItems) {
            this.insertItem(memberId, day, cellItems, 1);
        },

        insertTask: function (memberId, day, cellItems) {
            this.insertItem(memberId, day, cellItems, 2);
        },

        insertItem: function (memberId, day, cellItems, type_id) {
            u.clog('insertItem()');
            if( ! this.addItem.newItemContent ) {
                return;
            }
            this.addItem.isLoading = true;
            const date = this.$store.state.calendar.currentYear + '-' 
                        + this.$store.state.calendar.currentMonth + '-'
                        + ("0" + day).slice(-2);

            this.execInsertItem({
                'cellItems': cellItems,
                'date': date,
                'type_id': type_id,
                'memberId': memberId,
                'content': this.addItem.newItemContent
            });
        },

        execInsertItem(payload) {
            const url = '/api/v1/item';
            const params = {
                'date': payload.date,
                'type_id': payload.type_id,
                'member_id': payload.memberId,
                'content': payload.content,
                'start_time': null,
                'end_time': null
            };
    
            http.fetchPost(url, params)
                .then(response => this.successInsertItem(response, payload.cellItems))
                .catch(error => this.failedInsertItem(error));
        },

        successInsertItem(response, cellItems) {
            u.clog('success');
            this.addItemToArray(cellItems, response.data);
            this.resetAddItemFields();
        },

        failedInsertItem(error) {
            u.clog('failed');
            this.resetAddItemFields();
        },

        resetAddItemFields() {
            this.addItem.isLoading = false;
            this.addItem.newItemContent = '';
            this.$store.commit('toggleItemInserting', {
                isInserting: false,
                insertingCellTo: null
            });
        },

        // Move
        moveItem(payload) {
            u.clog('moveItem()');
            const y = this.$store.state.calendar.currentYear;
            const m = this.$store.state.calendar.currentMonth;
            const d = payload.enterCell.day;
    
//            payload.item.date = y + '-' + m + '-' + d;
            this.$store.commit('setDateToItem', {
                dayIndex: payload.fromCell.dayIndex,
                memberId: payload.fromCell.memberId,
                itemIndex: payload.cellItemsIndex,
                val: y + '-' + m + '-' + d
            });

//            payload.item.member_id = payload.member_id;
            this.$store.commit('setMemberIdToItem', {
                dayIndex: payload.fromCell.dayIndex,
                memberId: payload.fromCell.memberId,
                itemIndex: payload.cellItemsIndex,
                val: payload.enterCell.memberId
            });
    
            //this.removeItemFromArray(payload.cellItemsFrom, payload.cellItemsIndex);
            this.$store.commit('removeItem', { 
                dayIndex: payload.fromCell.dayIndex,
                memberId: payload.fromCell.memberId,
                itemIndex: payload.cellItemsIndex
            });

            //this.addItemToArray(payload.cellItemsTo, payload.item);
            this.$store.commit('addItem', {
                dayIndex: payload.enterCell.dayIndex,
                memberId: payload.enterCell.memberId,
                val: payload.item
            });
    
            this.execUpdateItem(payload.item, payload);
        },

        // update
        execUpdateItem(item, payload) {
            u.clog('updateItem()');
            const url = '/api/v1/item/' + item.id;
            const params = {
                'member_id': item.member_id,
                'content': item.content,
                'start_time': item.start_time,
                'end_time': item.end_time,
                'date': item.date
            };
    
            http.fetchPut(url, params)
                .then(response => this.successUpdateItem(response, payload))
                .catch(error => this.failedUpdateItem(error, payload));
        },
    
        successUpdateItem: function(response, payload) {
            u.clog('success');
            this.dragItem.isLoading = false;
            this.initDraggingProperties();
        },
    
        failedUpdateItem: function(error, payload) {
            u.clog('failed');
            this.dragItem.isLoading = false;

            // reverse item to original position(cell)
            this.removeItemFromArray(
                payload.cellItemsTo, 
                Object.keys(payload.cellItemsTo).length - 1
            );
            this.addItemToArray(payload.cellItemsFrom, payload.item);

            this.initDraggingProperties();
        },
    
        // delete
        removeItem(cellItems, item, itemIndex) {
            u.clog('removeItem()');
            this.removeItemFromArray(cellItems, itemIndex);
            this.execDeleteItem(cellItems, item, itemIndex);
        },

        execDeleteItem(cellItems, item, itemIndex) {
            const url = '/api/v1/item/' + item.id;
            http.fetchDelete(url)
                .then(response => this.successDeleteItem(response, cellItems, itemIndex))
                .catch(error => this.failedDeleteItem(error));
        },

        successDeleteItem(response, cellItems, itemIndex) {
            u.clog('success');
            this.deleteItem.isDeleting = false;
            this.initDraggingProperties();
        },

        failedDeleteItem(error) {
            u.clog('failed');
            this.deleteItem.isDeleting = false;
            this.initDraggingProperties();
        },
    }
}
