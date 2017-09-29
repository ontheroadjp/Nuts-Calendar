<template>
    <span class="item is-event"
        @click.stop="clickItem($event)">

        <strong v-if="!item.is_all_day" :class="{'vertial': displayVertically}"
            style="margin-right: 8px;">
                <span :style="startTimeStyle">
                    {{ item.start_time | timeFormatter }}
                </span>

                <span v-if="isEndTimeShow">
                    <span>|</span>
                    <span :style="endTimeStyle">
                        {{ item.end_time | timeFormatter }}
                    </span>
                </span>
        </strong>

        <strong v-else class="all-day" style="margin-right:8px">
            all-day
        </strong>

        <span :style="searchHighlightStyle">{{ item.content }}</span>

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

    props: [ 'cellItems', 'item' ],

    data() {
        return {
            displayVertically: false
        }
    },

    computed: {
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            deleteItem: state => state.remove
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isEndTimeShow: state => state.isEndTimeShow,
            searchQuery: state => (state.query.search).toLowerCase()
        }),

        startTimeStyle: function() {
            if(this.item.hasStartTimeError) {
                return { color: 'red' };
            }
            return {};
        },

        endTimeStyle: function() {
            if(this.item.hasEndTimeError) {
                return { color: 'red' };
            }
            return {};
        },

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
            this.updatePrepare( { cellItems: this.cellItems, editingItem: this.item } );
            this.updatePrepareModal( { event: e } );
            this.removePrepare( { cellItems: this.cellItems, deletingItem: this.item } );
            this.insertReset();
            this.$store.commit('dashboard/setValue', {
                key: 'disabled', value: true
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.vertial {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
}
</style>
