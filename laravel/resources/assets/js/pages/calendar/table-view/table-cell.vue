<template>
<div
    draggable="true"
    @mouseover="item.is_hover = true"
    @dragStart="handleDragStart(cellItems, item, cellItemsIndex, $event)"
    @dragEnd="handleDragEnd()"
>
<span v-show="!item.editing"
    style="cursor: move"
    :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
>

    <span v-if="item.type_id" 
        class="item"
        @click.stop="openEditItemModal()" 
        >({{ item.type_id }}){{{ item.start_time + ' - ' + item.content | itemFormatted }}}
        <span class="icon is-small" 
            v-show="(dragItem.isLoading || deleteItem.isLoading) && dragItem.draggingItem == item"
        >
            <i class="fa fa-refresh fa-spin"></i>
        </span>
    </span>

</span>
</div>
</template>

<script>
import itemFormatted from '../../../filters/item-formatted.js';
import itemService from '../../../services/item.js';
import dndService from '../../../services/table-item-dnd.js';

export default {
    props: [
        'cellItems', 'cellItemsIndex', 'item', 'isModalActive'
    ],

    mixins: [
        itemFormatted, itemService, dndService
    ],

    methods: {
        openEditItemModal() {
            u.clog('openEditItemModal()');
            this.item.oldValue = this.item.content;
            this.isModalActive = true;
            this.editItem.editingItem = this.item;
        },
    }
}
</script>

<style>
</style>
