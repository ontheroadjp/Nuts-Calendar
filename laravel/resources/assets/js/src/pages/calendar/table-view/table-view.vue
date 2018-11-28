<template id="calendar">
<div>
    <!-- original: 340 x 240 -->
    <popup-menu
        v-if="filteredBody && editItem.isActive"
        :clickX="editItem.clickX"
        :clickY="editItem.clickY"
        :isActive="editItem.isActive"
        :onClose="popupMenuClose"
        :offsetY="topPosition"
        :scrollX="scrollPositionX"
        :scrollY="scrollPositionY"
        :height="360"
        :width="480"
        ><item-edit-popup-content
            :height="340"
            :width="240"
            @close="popupMenuClose"
        ></item-edit-popup-content>
    </popup-menu>

    <div class="panel" :style="isLoading ? 'height: 100vh' : ''">

    <table
        class="table is-bordered thin"
        style="width: 100%;"
    >
        <thead v-if="filteredColumns">
            <tr>
                <th class="header-styling thin"
                    style="text-align: center; vertical-align: middle; padding: 0;"
                    :style="[style.firstColumnWidth]"
                >
                        <a
                            v-show="viewMode === 'dayly'"
                            class="button"
                            style="font-size: 0.8rem; width: 90%; background-color:#8a7676; color: #fff;"
                            @click="$store.commit('calendar/SET_VALUE', {
                                key: 'viewMode',
                                value: 'monthly'
                            });
                        ">Monthly</a>
                </th>

                <template v-for="(member, index) in filteredColumns">
                    <th v-show="!showColumns || showColumns.indexOf(index) > -1"
                        class="header-styling thin"
                        style="padding: 0.4rem 1rem"
                        :style="[columnWidth]"
                        ><span>{{ member.name }}</span>
                    </th>
                </template>

                <th v-if="showRightDay"
                    class="header-styling thin"
                    style="padding: 0.4rem 1rem"
                    :style="[style.firstColumnWidth]"
                ></th>
            </tr>
        </thead>

        <tbody v-if="filteredBody">

            <tr v-for="(row, rowIndex) in filteredBody"
                :class="{ saturday: viewMode === 'dayly' && isSaturday(row.date),
                            sunday: viewMode === 'dayly' && isSunday(row.date) || row.holidays.length > 0
                        }"
                :style="rowIndex == 0 && viewMode === 'dayly' ? style.monthlyItemRow : ''">

                <monthColumn
                    v-if="viewMode === 'monthly'"
                    :row="row"
                    :today="style.today"
                    :firstColumnWidth="style.firstColumnWidth"
                ></monthColumn>

                <dayColumn
                    v-if="viewMode === 'dayly'"
                    :row="row"
                    :today="style.today"
                    :firstColumnWidth="style.firstColumnWidth"
                ></dayColumn>

                <template v-for="(memberId, index) in showColumns">
                    <cell-items
                        :row="row"
                        :cellItems="row.items[memberId]"
                        :memberId="memberId"
                        :columnWidth="columnWidth"
                    ></cell-items>
                </template>

                <dayColumn
                    v-if="viewMode === 'dayly' && showRightDay"
                    :row="row"
                    :today="style.today"
                    :firstColumnWidth="style.firstColumnWidth"
                ></dayColumn>

                <monthColumn
                    v-if="viewMode === 'monthly' && showRightDay"
                    :row="row"
                    :today="style.today"
                    :firstColumnWidth="style.firstColumnWidth"
                ></monthColumn>

            </tr>
        </tbody>
    </table>
    </div><!-- // .panel -->

    <mini-cal-bar v-if="filteredBody"></mini-cal-bar>

</div><!-- // root -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import dayColumn from './day-column.vue';
import monthColumn from './month-column.vue';
import cellItems from './cell-items.vue';
import popupMenu from '../../../components/popup-menu.vue';
import itemEditPopupContent from './item/edit-popup-content.vue';
import miniCalBar from './footer-bar/mini-cal-bar.vue';
import dateUtilities from '../../../mixins/date-utilities.js';

export default {
    name: 'table-view-content',

    components: {
        popupMenu, dayColumn, monthColumn, cellItems, itemEditPopupContent, miniCalBar
    },

    mixins: [ dateUtilities ],

    props: {
        filteredColumns: { type: Object,  required: false },
        filteredBody:    { type: Array,   required: false },
        isLoading:       { type: Boolean, default: false },
        isFixed:         { type: Boolean, default: false },
        topPosition:     { type: Number,  required: false },
        scrollPositionX: { type: Number,  required: false },
        scrollPositionY: { type: Number,  required: false }
    },

    data() {
        return {
            fixedScrollPositionX: 0,
            fixedScrollPositionY: 0,
            showRightDay: false
        };
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
            lang: state => state.app.lang
        }),

        ...mapState('calendar', {
            viewMode: state => state.viewMode
        }),

        ...mapState('calendar/tableView/item', {
            editItem: state => state.update
        }),

        ...mapGetters({
            showColumns: 'getShowMembers'
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
                width: (100 - parseInt(this.style.firstColumnWidth.width)) / length + '%',
                minWidth: '206px'
            };
        },

        style: function() {
            return {
                monthlyItemRow: {
                    'background-color': '#f2f2f2'
                },
                firstColumnWidth: {
                    'width': '8%',
                    'min-width': '110px',
                    'max-width': '110px',
                },
                today: {
                    'border': '1px solid ' + this.theme.primary.code,
                    'background-color': this.theme.secondary.code,
                    'border-radius': '5px',
                    'color': 'white',
                    'padding': '5px'
                }
            };
        }
    },

    watch: {
        'scrollPositionY': function() {
            if(this.editItem.isActive) {
                document.body.scrollTop = this.fixedScrollPositionY;
            }
        },

        'editItem.isActive': function() {
            if(this.editItem.isActive) {
                this.fixedScrollPositionY = this.scrollPositionY;
            } else {
                this.fixedScrollPositionY = 0;
            }
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/update', {
            updateReset: 'reset'
        }),

        ...mapActions('calendar/tableView/item/remove', {
            removeReset: 'reset'
        }),

        popupMenuClose() {
            this.updateReset();
            this.removeReset();
            this.$store.commit('dashboard/SET_VALUE', {
                key: 'disabled', value: false
            });
        }
    }
};
</script>

<style lang="scss" scoped>
table.calendar {
    & tbody {
        & td {
            color: #ccc;
        }

        & tr:hover th {
            background-color: #eee;
        }
    }
}

$headerCellAndDayColumnCellColor: rgba(240, 240, 240, 0.85);

.header-styling {
    background-color: $headerCellAndDayColumnCellColor;
}

.saturday {
    background-color: rgba(228, 247, 255, 0.40) !important;

    & td:nth-child(1) {
        color: #1919ff;
    }
}

.sunday {
    background-color: rgba(253, 231, 231, 0.40) !important;

    & td:nth-child(1) {
        color: #ff2a1f;
    }
}
</style>
