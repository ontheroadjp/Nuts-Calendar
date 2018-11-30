<template>
    <span class="item is-event">
        <span class="icon is-small"
            v-show="item.memo"
            style="margin-right: 5px"
            ><i class="fa fa-file-text-o"></i>
        </span>

        <span v-if="!item.is_all_day"
            :class="[{'vertial': displayVertically}, 'thin-400']"
            style="margin-right: 8px;"
        >
                <span :class="{ 'thin-500': !item.hasStartTimeError }" :style="startTimeStyle">
                    {{ item.start_time | timeFormatter }}
                </span>

                <span v-if="isEndTimeShow">
                    <span>|</span>
                    <span :class="{ 'thin-500': !item.hasEndTimeError }" :style="endTimeStyle">
                        {{ item.end_time | timeFormatter }}
                    </span>
                </span>
        </span>

        <span v-else class="all-day" style="margin-right:8px">
            <i class="fa fa-circle" style="color: #fb04a4;"></i>
        </span>

        <span :style="searchHighlightStyle">{{ item.content }}</span>

        <span class="icon is-small"
            v-show="((dragItem.isLoading || deleteItem.isLoading)
                        && dragItem.draggingItem === item)
                    || (updateItem.isLoading && updateItem.editingItem === item)
                    || isLoading"
            ><i class="fa fa-refresh fa-spin"></i>
        </span>
    </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import timeFormatter from '../../../../filters/time-formatter.js';

export default {
    mixins: [ timeFormatter ],

    props: [ 'cellItems', 'item', 'isLoading' ],

    data() {
        return {
            displayVertically: false,
            timeErrorColor: '#ff3860'
        }
    },

    computed: {
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            updateItem: state => state.update,
            deleteItem: state => state.remove
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isEndTimeShow: state => state.isEndTimeShow,
            searchQuery: state => (state.query.search).toLowerCase()
        }),

        startTimeStyle: function() {
            if(this.item.hasStartTimeError) {
                return { color: this.timeErrorColor };
            }
            return {};
        },

        endTimeStyle: function() {
            if(this.item.hasEndTimeError) {
                return { color: this.timeErrorColor };
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
    }
}
</script>

<style lang="scss" scoped>
.is-event {
    margin-bottom: 2px;
    padding: 5px;
    background-color: rgb(240, 240, 240);
    color: #023a31;
}

.vertial {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
}
</style>
