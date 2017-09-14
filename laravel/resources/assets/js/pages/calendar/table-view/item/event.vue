<template>
    <span class="item is-event" 
        :style="searchHighlightStyle"
        @click.stop="clickItem($event)">

        <span v-show="item.hasStartTimeError" style="color:red">!S!</span>
        <span v-show="item.hasEndTimeError" style="color:red">!E!</span>

        <strong v-show="item.start_time" style="margin-right: 8px;">
            {{ item.start_time | timeFormatter }} 
            <template v-show="item.end_time !== null">
                <br>{{ item.end_time | timeFormatter }}
            </template>
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
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            deleteItem: state => state.remove
        }),

        ...mapState('calendar/tableView/toolPalette', {
            searchQuery: state => (state.query.search).toLowerCase()
        }),

        searchHighlightStyle: function() {
            if( this.searchQuery != '' 
                    && this.item.content.toLowerCase().indexOf(this.searchQuery) != -1) {
                return { backgroundColor: '#FFEB3B' }
            }
            return {}
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item', {
            insertReset: 'insert/reset',
            updatePrepare: 'update/prepare',
            updatePrepareModal: 'update/prepareModal',
            removePrepare: 'remove/prepare'
        }),

        clickItem(e) {
            u.clog('clickItem()');
            this.updatePrepare( { editingItem: this.item } );
            this.updatePrepareModal( { event: e } );
            this.removePrepare( { event: e, deletingItem: this.item } );
            this.insertReset();
            this.$store.commit('dashboard/setValue', {
                key: 'disabled', value: true
            });
        }
    }
}
</script>
