export default {
    data() {
        return {
            dragItem: {
                isLoading: false,
                draggingItem: '',
                fromCell: '',
                enterCell: '',
                enterTrash: false,
                cellItemsFrom: '',
                cellItemsIndex: '',
                isDropped: false,
                style: {
                    dragStart: {
                        opacity: '0.4'
                    }
                }
            },
        }
    },

    computed: {
        dragEnter: function() {
            return { 
                border: '2px solid ' + this.theme.secondary.code,
            }
        },
    },

    methods: {
            handleDragStart(fromCell, cellItems, item, cellItemsIndex, e) {
                this.dragItem.fromCell = fromCell;
                this.dragItem.cellItemsFrom = cellItems;
                this.dragItem.draggingItem = item;
                this.dragItem.cellItemsIndex = cellItemsIndex;
//                item.is_hover = false;
            },

            handleDragEnter(cell) {
                this.dragItem.enterCell = cell;
            },

            handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.dataTransfer.dropEffect = 'move'

                return false;
            },

            handleDrop(e, cellItemsTo) {
                const cellItemsFrom = this.dragItem.cellItemsFrom;
                if( cellItemsFrom === cellItemsTo ) { return; }

                this.dragItem.isLoading = true;
                this.dragItem.isDropped = true;

                this.moveItem({
                    'cellItemsFrom': cellItemsFrom,
                    'cellItemsTo': cellItemsTo,
                    'item': this.dragItem.draggingItem,
                    'cellItemsIndex': this.dragItem.cellItemsIndex,
                    'fromCell': {
                        address: this.dragItem.fromCell,
                        dayIndex: (this.dragItem.fromCell.split('-')[0]) - 1,
                        day: this.dragItem.fromCell.split('-')[0],
                        memberId: this.dragItem.fromCell.split('-')[1]
                    },
                    'enterCell': {
                        address: this.dragItem.enterCell,
                        dayIndex: (this.dragItem.enterCell.split('-')[0]) - 1,
                        day: this.dragItem.enterCell.split('-')[0],
                        memberId: this.dragItem.enterCell.split('-')[1]
                    },
                    'day': this.dragItem.enterCell.split('-')[0],
                    'member_id': this.dragItem.enterCell.split('-')[1],
                });
            },

            handleDropInTrash(e) {
                this.deleteItem.isLoading = true;
                this.dragItem.isDropped = true;

                this.removeItem(
                    this.dragItem.cellItemsFrom, 
                    this.dragItem.draggingItem, 
                    this.dragItem.cellItemsIndex
                );
            },

            handleDragEnd() {
                if( !this.dragItem.isLoading ) {
                    this.initDraggingProperties();
                }
            },

            initDraggingProperties() {
                this.dragItem.draggingItem = '';
                this.dragItem.cellItemsIndex = '';
                this.dragItem.cellItemsFrom = '';
                this.dragItem.enterCell = '';
                this.dragItem.isDropped = false;
            },
    }

}
