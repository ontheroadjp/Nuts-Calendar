<template>
    <span class="item is-event" @click.stop="clickItem()">
        <strong v-show="item.start_time" style="margin-right: 8px">
            {{ item.start_time | timeFormatter }}
        </strong> {{ item.content }}
        <span class="icon is-small" 
            v-show="(dragItem.isLoading || deleteItem.isLoading) 
                        && dragItem.draggingItem == item"
            ><i class="fa fa-refresh fa-spin"></i>
        </span>
    </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import timeFormatter from '../../../../filters/time-formatter.js';

export default {
    mixins: [ timeFormatter ],

    props: [ 'item' ],

    computed: {
        ...mapState('action/item', {
            dragItem: state => state.dnd,
            deleteItem: state => state.remove
        })
    },

    methods: {
        ...mapActions('action/item', {
            prepareUpdateItem: 'update/prepare',
            prepareRemoveItem: 'remove/prepare'
        }),

        clickItem() {
            u.clog('clickItem()');
            this.prepareUpdateItem( { editingItem: this.item } );
            this.prepareRemoveItem( { deletingItem: this.item } );
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
