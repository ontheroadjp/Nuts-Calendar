export default {
    data() {
        return {
            dragItem: {
                isLoading: false,
                draggingItem: '',
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
            handleDragStart(cellItems, item, cellItemsIndex, e) {
                this.dragItem.cellItemsFrom = cellItems;
                this.dragItem.draggingItem = item;
                this.dragItem.cellItemsIndex = cellItemsIndex;
                item.is_hover = false;
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

            handleDrop(e, cellItems) {
                this.dragItem.isLoading = true;
                u.clog('this.dragItem.isLoading: ' + this.dragItem.isLoading);
                this.dragItem.isDropped = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.moveItem({
                    'cellItemsFrom': this.dragItem.cellItemsFrom,
                    'cellItemsTo': cellItems,
                    'item': this.dragItem.draggingItem,
                    'cellItemsIndex': this.dragItem.cellItemsIndex,
                    'day': this.dragItem.enterCell.split('-')[0],
                    'member_id': this.dragItem.enterCell.split('-')[1],
                });
            },

            handleDropInTrash(e) {
                this.deleteItem.isLoading = true;
                this.dragItem.isDropped = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.removeItem(
                    this.dragItem.cellItemsFrom, 
                    this.dragItem.draggingItem, 
                    this.dragItem.cellItemsIndex
                );
            },

            handleDragEnd() {
                this.initDraggingProperties();
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
