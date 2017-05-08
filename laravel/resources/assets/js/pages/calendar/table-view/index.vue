<template>
<div class="main-calendar-panel-wrapper">

    <!-- tool palette -->
    <div v-show="isToolPaletteOpen" 
        id="tool-palette" 
        style="background:#f0f0f0; padding:5px;"
        transition="tool-palette"
    >
        <tool-palette 
            :is-open.sync="isToolPaletteOpen"
            :internal-query.sync="query.internal"
            :search-query.sync="query.search"
        ></tool-palette>
    </div>

    <!-- table header -->
    <div id="table-view-header" 
        :class="['main-calendar-panel-header', {sticky: isFixed}]"
    >

        <div v-show="isLoadingCalendarApi" class="black-screen"></div>
        <table-view 
            display="header" 
            :filtered-columns="filteredColumns"
            :show-columns="showColumns"
        ></table-view>
    </div>

    <!-- table body -->
    <div id="table-view-body" 
        :class="['main-calendar-panel', {'sticky-offset': isFixed}]" 
        @scroll="onScrollBody()"
    >
        <div v-show="isLoadingCalendarApi" class="black-screen">
            <div class="has-text-centered" style="
                position: absolute;
                top: 5%;
                left: 50%;
                transform: translateX(-50%);
                "><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </div>

        <table-view 
            display="body" 
            :filtered-calendar="filteredCalendar" 
            :show-columns="showColumns"
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
            'isToolPaletteOpen'
        ],

        data() {
            return {
                position: 0,
                showColumns: [],
                query: {
                    search: '',
                    internal: ''
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
                Object.keys(data).forEach(function(key) {
                    let val = this[key];
                    if( val.isShow === true) {
                        result[key] = val;
                        self.showColumns.push(key);
                    }
                }, data);
                return result;
            },

            filteredCalendar: {
                cash: true,
                get() {
                    const self = this;
                    let data = this.$store.state.calendar.data.calendars;
                    let filterWord = this.query.search && this.query.search.toLowerCase();
    
                    // filter by day of the week index
                    if(! filterWord) {
                        filterWord = this.query.internal;
                        if(filterWord) {
                            data = data.slice().filter(function (row) {
                                return self.getDayIndex(row['date']) == filterWord;
                            });
                        }
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
//            orderByStartTime: function(value) {
//                if(value.length === 0) return value;
//                return value.slice().sort((a, b) => {
//    
//                    if( a.start_time === undefined || a.start_time === null ) return -1;
//                    if( b.start_time === undefined || b.start_time === null ) return 1;
//    
//                    const aArr = a.start_time.split(':');
//                    const bArr = b.start_time.split(':');
//    
//                    // sort by hour
//                    if (parseInt(aArr[0]) < parseInt(bArr[0])) return -1;
//                    if (parseInt(aArr[0]) > parseInt(bArr[0])) return 1;
//    
//                    // sort by minits
//                    if (parseInt(aArr[1]) < parseInt(bArr[1])) return -1;
//                    if (parseInt(aArr[1]) > parseInt(bArr[1])) return 1;
//    
//                    // the same value
//                    return 0;
//                });
//            },

            updateHeight: function() {
                this.height.headerNav = document.getElementById('headerNav').clientHeight;
                this.height.signboard = document.getElementById('signboard').clientHeight;
                this.height.toolPalette = 0;

                if(this.$route.path == '/calendar/view' && this.isToolPaletteOpen) {
                    this.height.toolPalette = document.getElementById('tool-palette').clientHeight -2;
                }
            },

            onScrollBody: function() {
                this.elements.tableHeader.scrollLeft = this.elements.tableBody.scrollLeft;
            },
        },

        watch: {
            isToolPaletteOpen: function() {
                this.updateHeight();
            }
        },

        ready() {
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

<style>
.main-calendar-panel {
    user-select: none;
    overflow-y: scroll;
    position: relative;
    height: 100%;
/*    height: 100vh; */
} 
.main-calendar-panel-wrapper {
    position: relative;
}
.main-calendar-panel-header {
    user-select: none;
    overflow: hidden;
    position: relative;
    height: 36px;
}
.black-screen {
    background: rgba(217, 217, 217, 0.75);
    position: absolute;
    min-height: 100%;
    min-width: 100%;
    z-index: 999;
}
.sticky {
    position: fixed;
    background: red;
    top: 0;
    width: 100%;
    z-index: 99;
}
.sticky-offset {
    margin-top: 37px;
}
.tool-palette-transition {
    transition: all .2s ease;
    height: 40px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
}
.tool-palette-enter, .tool-palette-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
</style>
