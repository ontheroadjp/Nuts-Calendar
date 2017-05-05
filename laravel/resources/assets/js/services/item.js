export default {
    data() {
        return {
            addItem: {
                isInserting: false,
                cellTo: '',
                newItemContent: '',
            },

            deleteItem: {
                isDeleting: false,
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
        insertItem: function (memberId, day, cellItems) {
            u.clog('insertItem()');
            if( ! this.addItem.newItemContent ) {
                return;
            }
            this.addItem.isInserting = true;
            const date = this.$store.state.calendar.currentYear + '-' 
                        + this.$store.state.calendar.currentMonth + '-'
                        + ("0" + day).slice(-2);

            this.execInsertItem({
                'memberId': memberId,
                'date': date,
                'cellItems': cellItems,
                'content': this.addItem.newItemContent
            });
        },

        execInsertItem(payload) {
            const url = '/api/v1/item';
            const params = {
                'date': payload.date,
                'member_id': payload.memberId,
                'content': payload.content
            };
    
            http.fetchPost(url, params)
                .then(response => this.successInsertItem(response, payload.cellItems))
                .catch(error => this.failedInsertItem(error));
        },

        successInsertItem(response, cellItems) {
            u.clog('success');
            this.addItem.isInserting = false;
            const item = response.data;
            this.addItemToArray(cellItems, item);
            this.addItem.newItemContent = '';
            this.addItem.cellTo = '';
        },

        failedInsertItem(error) {
            u.clog('failed');
            this.addItem.isInserting = false;
            this.addItem.newItemContent = '';
            this.addItem.cellTo = '';
        },

        // Move
        moveItem(payload) {
            u.clog('moveItem()');
            this.addItemToArray(payload.cellItemsTo, payload.item);
            this.removeItemFromArray(payload.cellItemsFrom, payload.cellItemsIndex);
    
            const y = this.$store.state.calendar.currentYear;
            const m = this.$store.state.calendar.currentMonth;
            const d = payload.day;
    
            payload.item.date = y + '-' + m + '-' + d;
            payload.item.member_id = payload.member_id;
    
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
            this.dragItem.isUpdating = false;
            this.initDraggingProperties();
        },
    
        failedUpdateItem: function(error, payload) {
            u.clog('failed');
            this.dragItem.isUpdating = false;

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
