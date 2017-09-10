<template id="calendar">
<div>
    <black-screen v-if="isLoading">
        <div v-show="filteredBody" class="has-text-centered black-screen-loading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    </black-screen>

    <popup-menu 
        v-if="filteredBody && editItem.isActive"
        :clickX="editItem.clickX" :clickY="editItem.clickY" 
        :isActive="editItem.isActive" 
        :onClose="popupMenuClose"
        overlayId="table-view-body"
        :offsetY="topPosition"
        :scrollX="scrollPositionX"
        :scrollY="scrollPositionY"
    >
        <div style="margin:0; width:100%; height:100%; background-color: orange;">
            <span>This is a popup menu</span>
        </div>
    </popup-menu>

    <black-screen 
        v-if="!filteredBody && editItem.isActive" 
        overlayId="table-view-header"
    ></black-screen>

    <div class="panel" :style="isLoading ? 'height: 100vh' : ''">
    <table 
        class="table is-bordered"
        style="width: 100%;"
        :style="isFixed ? style.table : ''"
    >
    <thead v-if="filteredColumns">
        <tr>
            <th class="thin-500" 
                style="padding: 0.4rem 1rem"
                :style="[style.dayColumnWidth, textColor]"
            ></th>
            <template v-for="(member, memberId) in filteredColumns">
                <th v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    class="thin-500"
                    style="padding: 0.4rem 1rem"
                    :style="[columnWidth, textColor]"
                    ><span>{{ member.name }}({{ member.id}})</span>
                </th>
            </template>
        </tr>
    </thead>

    <tbody v-if="filteredBody">
        <tr v-for="(day, dayIndex) in filteredBody"
            :class="{ saturday: isSaturday(day.date), sunday: isSunday(day.date) }"
            >

            <td class="date-styling thin-500" :style="[style.dayColumnWidth]">
                <span>
                    {{ getDateAndDay(day.date) }}
                </span>
            </td>

            <template v-for="(cellItems, memberId) in day.items">
                <td v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[
                        columnWidth, 
                        dragItem.enterCell.cellAddress 
                            == getCellAddress(getRowIndex(day.date), memberId) 
                            ? dragEnterStyle : ''
                    ]"
                    @click="clickCell(dayIndex, memberId)"
                    @dragenter="handleDragEnter(day.date, memberId)"
                    @dragover="handleDragOver($event)"
                    @drop.stop="handleDrop()"
                    >

                    <div v-for="(item, itemIndex) in cellItems"
                        style="cursor: move"
                        :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
                        draggable="true"
                        @dragstart="handleDragStart(item)"
                        @dragend="handleDragEnd()"
                        >

                        <item 
                            :isEventItem="isEventItem" 
                            :isTaskItem="isTaskItem" 
                            :item="item"
                        ></item>

                    </div><!-- // v-for -->

                    <item-insert-field 
                        v-if="addItem.enterCell.dayIndex === dayIndex 
                                && addItem.enterCell.memberId === memberId"
                    ></item-insert-field>
                </td>
            </template>
        </tr>
    </tbody>
    </table>
    </div><!-- // .panel -->

    <mini-cal-bar v-if="filteredBody"></mini-cal-bar>

</div><!-- // root -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import dateUtilities from '../../../mixins/date-utilities.js';
import blackScreen from '../../../components/black-screen.vue';
import popupMenu from '../../../components/popup-menu.vue';
import item from './item/index.vue';
import itemInsertField from './item-insert-field.vue';
import miniCalBar from './footer-bar/mini-cal-bar.vue';
import chroma from 'chroma-js';

export default {
    name: 'table-view-content',

    components: {
        'black-screen': blackScreen,
        'popup-menu': popupMenu,
        'item': item,
        'item-insert-field': itemInsertField,
        'mini-cal-bar': miniCalBar
    },

    mixins: [ dateUtilities ],

    props: {
        filteredColumns:    { type: Object,     required: false }, 
        filteredBody:       { type: Array,      required: false }, 
        isLoading:          { type: Boolean,    default: false },
        isFixed:            { type: Boolean,    default: false },
        topPosition:        { type: Number,     required: false },
        scrollPositionX:     { type: Number,     required: false },
        scrollPositionY:     { type: Number,     required: false }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isEventItem: state => state.isEventItemShow,
            isTaskItem: state => state.isTaskItemShow
        }),

        ...mapState('calendar/tableView/item', {
            addItem: state => state.insert,
            editItem: state => state.update,
            dragItem: state => state.dnd
        }),

        ...mapGetters({
            showColumns: 'getShowMembers',
            getCellAddress: 'getCellAddress',
            getRowIndex: 'getRowIndex'
        }),

        columnWidth: function() {
            let length = 0;

            if(this.showColumns) {
                length = this.showColumns.length;
            } else if(this.filteredColumns) {
                length = Object.keys(this.filteredColumns).length;
            } else {
                length = Object.keys(this.filteredBody[0].items).length;
            }

            return {
                width: (100 - parseInt(this.style.dayColumnWidth.width)) / length + '%',
                minWidth: '206px'
            }
        },

        textColor: function(){
            if(!this.isFixed) return;

            return {
                color: 'white'
            }
        },

        dragEnterStyle: function() {
            return { 
                border: '2px solid ' + this.theme.secondary.code
            }
        },

        style: function() {
            return {
                table: {
                    'background-color': chroma(this.theme.primary.code).alpha(0.7).css('hsl'),
                    'width': '100%'
                },
                dayColumnWidth: {
                    'width': '8%',
                    'min-width': '110px',
                    'max-width': '110px'
                }
            }
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/insert', {
            prepareInsertItem: 'prepare',
        }),

        ...mapActions('calendar/tableView/item/update', {
            updateReset: 'reset'
        }),

        ...mapActions('calendar/tableView/item/remove', {
            removeReset: 'reset'
        }),

        ...mapActions('calendar/tableView/item/dnd', {
            dragStart: 'dragStart',
            dragEnter: 'dragEnter',
            dragOver: 'dragOver',
            drop: 'drop',
            dragEnd: 'dragEnd'
        }),

        clickCell(dayIndex, memberId) {
            u.clog('clickCell()');
            this.prepareInsertItem( { dayIndex, memberId } );
        },

        popupMenuClose() {
            this.updateReset();
            this.removeReset();
        },

        handleDragStart(draggingItem) {
            this.dragStart({ draggingItem });
        },

        handleDragEnter(dayString, memberId) {
            this.dragEnter({ dayString, memberId });
        },

        handleDragOver(e) {
            this.dragOver({ e });
        },

        handleDrop() {
            this.drop();
        },

        handleDragEnd() {
            this.dragEnd();
        }
    }
}
</script>

<style lang="scss" scoped>
.black-screen-loading {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
}

table.calendar {
    & tbody {
        & td {
            color: #ccc;
        }

        & tr:hover th {
            background-color: #eee;
        }
    }

    &:hover tbody {
        &:hover td:hover {
            opacity: 1;
            background-color: rgba(145, 235, 250, 0.5);
        }
        & tr:hover td {
            color: #666;
            background-color: rgba(145, 235, 250, 0.1);
        }

    }
}

.date-styling {
    font-size: 1em;
}

.today {
    background-color: red;
    color: #fff;
    border-radius: 20px;
}

.saturday {
    /* background-color: rgba(240, 240, 255, 1); */
    background-color: rgb(228, 247, 255);
}

.sunday {
    /* background-color: rgba(255, 240, 240, 1); */
    background-color: rgb(253, 231, 231);
}
</style>
