<template>
<div class="main-calendar-panel-wrapper">

    <!-- tool palette -->
    <transition name="tool-palette">
        <div v-show="isToolPaletteOpen" 
            id="tool-palette" 
            style="background:#f0f0f0; padding:5px; overflow: scroll"
        >
            <tool-palette 
                :internal-query.sync="query.internal"
                :search-query.sync="query.search"
                :is-event-show.sync="item.event.isShow"
                :is-task-show.sync="item.task.isShow"
            ></tool-palette>
        </div>
    </transition>

    <!-- table header -->
    <div id="table-view-header" 
        :class="['main-calendar-panel-header', {sticky: isFixed}]"
    >
        <table-view 
            :filtered-columns="filteredColumns"
            :show-columns="showColumns"
            :is-loading-calendar-api="isLoadingCalendarApi"
        ></table-view>
    </div>

    <!-- table body -->
    <div id="table-view-body" 
         :class="['main-calendar-panel-body', {'sticky-offset': isFixed}]" 
         @scroll="onScrollBody()"
    >
        <table-view 
            :filtered-body="filteredCalendar" 
            :show-columns="showColumns"
            :is-event-show="item.event.isShow"
            :is-task-show="item.task.isShow"
            :is-loading-calendar-api="isLoadingCalendarApi"
        ></table-view>
    </div>

    <!-- jump to the page top button -->
    <a  href="#top" 
        class="button" 
        style="position: fixed; bottom: 30px; right: 30px" 
        v-show="position > fixedHeight" 
        >Jump To Top
    </a>

</div>
</template>

<script>
    import tableView from './table-view.vue';
    import toolPalette from './table-tool-palette.vue';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import orderByStartTime from '../../../mixins/order-by-start-time.js';
    
    export default {
        components: {
            'table-view': tableView,
            'tool-palette': toolPalette,
        },

        mixins: [
            dateUtilities, orderByStartTime
        ],

        props: [
            'isLoadingCalendarApi',
        ],

        data() {
            return {
                position: 0,
                showColumns: [],
                query: {
                    search: '',
                    internal: ''
                },
                item: {
                    event: {
                        isShow: true
                    },
                    task: {
                        isShow: true
                    }
                },
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
            isToolPaletteOpen: function() {
                return this.$store.state.calendar.ui.isToolPalette;
            },

            isFixed: function() {
                return this.position > this.fixedHeight;
            },

            fixedHeight: function() {
                return this.height.headerNav 
                        + this.height.signboard 
                        + this.height.toolPalette;
            },

            filteredColumns: function() {
                const self = this;
                let data = this.$store.state.calendar.data.members;
                this.showColumns = [];

                let result = {};
                Object.keys(data).forEach(function(memberId) {
                    let member = this[memberId];
                    if( member.isShow === true) {
                        result[memberId] = member;
                        self.showColumns.push(memberId);
                    }
                }, data);
                return result;
            },

            filteredCalendar: {
                cash: true,
                get() {
                    const self = this;
                    let data = this.$store.state.calendar.data.calendars;
                    let searchQuery = this.query.search.toLowerCase();
                    let internalQuery = this.query.internal;
    
                    // filter by search words
                    if(searchQuery) {
                        data = data.slice().filter( day => {
                            return this.getItemContentsAsString(day).indexOf(searchQuery) > -1;
                        });
                    }

                    // filter by day of the week
                    if(internalQuery) {
                        data = data.slice().filter( row => {
                            return this.getDayIndex(row['date']) == internalQuery;
                        });
                    }
    
                    // sort cell items
                    data.forEach(function(day) {
                        let columns = day.items;
                        const memberIds = Object.keys(columns);
                        memberIds.forEach(function(id) {
                            columns[id] = self.sortCellItems(columns[id]);
                        });
                    });
    
                    return data;
                }
            },
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
    
                    if(this.$router.path == '/calendar/view' && this.isToolPaletteOpen) {
                        this.height.toolPalette = document.getElementById('tool-palette').clientHeight -2;
                    }
                });
            },

            onScrollBody: function() {
                this.elements.tableHeader.scrollLeft = this.elements.tableBody.scrollLeft;
            },
        },

        watch: {
            'isToolPaletteOpen': function() {
                this.updateHeight();
            }
        },

        created() {
            this.updateHeight();

            const self = this;
            window.addEventListener('resize', function (event) {
                self.updateHeight();
            });

            document.onscroll = function(e) {
                self.position = document.documentElement.scrollTop || document.body.scrollTop;
            };

            this.elements.tableHeader = document.getElementById('table-view-header');
            this.elements.tableBody = document.getElementById('table-view-body');
        },
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
            background: red;
            top: 0;
            width: 100%;
            z-index: 99;
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

.tool-palette-enter-active, .tool-palette-leave-active {
    transition: all .2s ease;
    height: 40px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
}
.tool-palette-enter, .tool-palette-leave-to {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
</style>
