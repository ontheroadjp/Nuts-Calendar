<template id="calendar">
<div>
    <popup-menu
        v-if="filteredBody && editItem.isActive"
        :clickX="editItem.clickX"
        :clickY="editItem.clickY"
        :isActive="editItem.isActive"
        :onClose="popupMenuClose"
        :offsetY="topPosition"
        :scrollX="scrollPositionX"
        :scrollY="scrollPositionY"
        :height="340"
        :width="240"
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
                    style="padding: 0.4rem 1rem"
                    :style="[style.dayColumnWidth]"
                ></th>

                <template v-for="(member, index) in filteredColumns">
                    <th v-show="!showColumns || showColumns.indexOf(index) > -1"
                        class="header-styling thin"
                        style="padding: 0.4rem 1rem"
                        :style="[columnWidth]"
                        ><span>{{ member.name }}</span>
                    </th>
                </template>

                <th class="header-styling thin"
                    style="padding: 0.4rem 1rem"
                    :style="[style.dayColumnWidth]"
                ></th>
            </tr>
        </thead>

        <tbody v-if="filteredBody">
            <tr v-for="(day, dayIndex) in filteredBody"
                :class="{ saturday: isSaturday(day.date),
                            sunday: isSunday(day.date) || day.holidays.length > 0
                        }">

                <dayColumn
                    :day="day"
                    :today="style.today"
                    :dayColumnWidth="style.dayColumnWidth"
                ></dayColumn>

                <template v-for="(cellItems, memberId) in day.items">
                    <cell-items
                        :day="day"
                        :dayIndex="dayIndex"
                        :cellItems="cellItems"
                        :memberId="memberId"
                        :columnWidth="columnWidth"
                    ></cell-items>
                </template>

                <dayColumn
                    :day="day"
                    :today="style.today"
                    :dayColumnWidth="style.dayColumnWidth"
                ></dayColumn>
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
import cellItems from './cell-items.vue';
import popupMenu from '../../../components/popup-menu.vue';
import itemEditPopupContent from './item/edit-popup-content.vue';
import miniCalBar from './footer-bar/mini-cal-bar.vue';
import dateUtilities from '../../../mixins/date-utilities.js';

export default {
    //name: 'table-view-content',
    name: 'table-view-content',

    components: {
        popupMenu, dayColumn, cellItems, itemEditPopupContent, miniCalBar
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
            fixedScrollPositionY: 0
        };
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
            lang: state => state.app.lang
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
                width: (100 - parseInt(this.style.dayColumnWidth.width)) / length + '%',
                minWidth: '206px'
            };
        },

        style: function() {
            return {
                dayColumnWidth: {
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
    background-color: rgb(228, 247, 255) !important;

    & td:nth-child(1) {
        color: blue;
    }
}

.sunday {
    background-color: rgb(253, 231, 231) !important;

    & td:nth-child(1) {
        color: red;
    }
}
</style>
