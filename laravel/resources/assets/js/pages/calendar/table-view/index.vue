<template>
<div class="main-calendar-panel-wrapper">

    <transition name="tool-palette">
        <tool-palette v-show="isToolPaletteOpen"></tool-palette>
    </transition>

    <div id="table-view-header" 
        :class="['main-calendar-panel-header', {sticky: isFixed}]"
        ><table-view 
            :filtered-columns="filteredColumns"
            :is-black-screen-show="calendarServiceIsLoading"
            :is-fixed="isFixed"
        ></table-view>
    </div>

    <div id="table-view-body" 
         :class="['main-calendar-panel-body', {'sticky-offset': isFixed}]" 
         @scroll="onScrollBody()"
        ><table-view 
            :filtered-body="filteredCalendar" 
            :is-black-screen-show="calendarServiceIsLoading"
        ></table-view>
    </div>

    <!-- jump to the page top button -->
    <a  href="#top" 
        class="button" 
        style="position: fixed; bottom: 30px; right: 30px" 
        :style="'color: white; background-color: ' + theme.primary.code"
        v-show="position > fixedHeight && !draggingItem" 
        >{{ t('calendar.jumpToTop') }}
    </a>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    import core from '../../../mixins/core.js';
    import tableView from './table-view.vue';
    import toolPalette from './table-tool-palette.vue';
    import dateUtilities from '../../../mixins/date-utilities.js';
    
    export default {
        components: {
            'table-view': tableView,
            'tool-palette': toolPalette
        },

        mixins: [
            core, dateUtilities
        ],

        props: [
            'calendarServiceIsLoading'
        ],

        data() {
            return {
                position: 0,
                height: {
                    headerNav: 0,
                    signboard: 0,
                    toolPalette: 0
                },
                elements: {
                    tableHeader: '',
                    tableBody: ''
                }
            }
        },
        
        computed: {
            ...mapState('action/calendar/tableView/toolPalette', {
                isToolPaletteOpen: state => state.toolPalette.isActive,
                searchQuery: state => (state.query.search).toLowerCase(),
                internalQuery: state => state.query.internal
            }),

            ...mapState('action/calendar/tableView/item/dnd', {
                draggingItem: state => state.draggingItem
            }),

            isFixed: function() {
                return this.position > this.fixedHeight;
            },

            fixedHeight: function() {
                return this.height.headerNav 
                        + this.height.signboard 
                        + this.height.toolPalette;
            },

            filteredColumns: function() {
                return this.$store.getters.filteredMembers;
            },

           filteredCalendar: {
                cache: true,
                get() {
                    let data = this.$store.state.calendar.data.calendars;
    
                    // filter by search words
                    if(this.searchQuery) {
                        data = data.slice().filter( day => {
                            return this.getItemContentsAsString(day).indexOf(this.searchQuery) > -1;
                        });
                    }
    
                    // filter by day of the week
                    if(this.internalQuery) {
                        data = data.slice().filter( row => {
                            return this.getDayIndex(row['date']) == this.internalQuery;
                        });
                    }

                    // sort cell items
                    this.$store.commit('sortCellItemsByStartTime', data);

                    return data;
                }
            }
        },

        methods: {
            getItemContentsAsString: function(day) {
                let result = '';
                let columns = day.items;
                const memberIds = Object.keys(columns);

                memberIds.forEach(function(id) {
                    const cellItems = columns[id];
                    cellItems.forEach(function(item) {
                        result += item.content.toLowerCase() + ' ';
                    });
                });
                return result;
            },

            updateHeight: function() {
                this.$nextTick( () => {
                    this.height.headerNav = document.getElementById('headerNav').clientHeight;
                    this.height.signboard = document.getElementById('signboard').clientHeight;
                    this.height.toolPalette = 0;
    
                    if(this.$route.path == '/calendar/view' && this.isToolPaletteOpen) {
                        this.height.toolPalette = document.getElementById('tool-palette').clientHeight -2;
                    }
                });
            },

            onScrollBody: function() {
                this.elements.tableHeader.scrollLeft = this.elements.tableBody.scrollLeft;
            }
        },

        watch: {
            'isToolPaletteOpen': function() {
                setTimeout(this.updateHeight, 500);
            }
        },

        mounted() {
            this.$nextTick( () => {
                this.updateHeight();
    
                const self = this;
                let resizing; 

                window.addEventListener('resize', function (event) {
                    if (resizing) { clearTimeout(resizing); }
                    resizing = setTimeout(function() {
                        u.clog('window resized');
                        self.updateHeight();
                    }, 500);
                });
    
                document.onscroll = function(e) {
                    self.position = document.documentElement.scrollTop || document.body.scrollTop;
                };
    
                this.elements.tableHeader = document.getElementById('table-view-header');
                this.elements.tableBody = document.getElementById('table-view-body');
            });
        }
    }
</script>

<style lang="scss" scoped>
.main-calendar-panel-wrapper {
    position: relative;

    & .main-calendar-panel-header {
        user-select: none;
        overflow: hidden;
        position: relative;
        height: 36px;

        &.sticky {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 99;
            border-bottom: 1px solid #dbdbdb;
        }
    }

    & .main-calendar-panel-body {
        user-select: none;
        overflow-y: scroll;
        position: relative;
        height: 100%;

        &.sticky-offset {
            margin-top: 37px;
        }
    }
}

.tool-palette-enter-active,
.tool-palette-leave-active {
    transition: all 0.1s ease;
    height: 40px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
}

.tool-palette-enter,
.tool-palette-leave-to {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
</style>
