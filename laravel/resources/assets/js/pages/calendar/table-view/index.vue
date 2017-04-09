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
    <div class="main-calendar-panel-header" :class="{sticky: isFixed}">
    <div v-show="isLoadingCalendarApi" class="black-screen"></div>
        <table-view 
            display="header" 
            id="table-view-header"
        ></table-view>
    </div>

    <!-- table body -->
    <div class="main-calendar-panel" :class="{'sticky-offset': isFixed}">
    <div v-show="isLoadingCalendarApi" class="black-screen"></div>
        <table-view 
            display="body" 
            id="table-view-body"
            :filtered-calendar="filteredCalendar"
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
    
    export default {
        components: {
            'table-view': tableView,
            'tool-palette': toolPalette,
        },

        mixins: [
            dateUtilities
        ],

        props: [
            'isLoadingCalendarApi',
            'isToolPaletteOpen'
        ],

        computed: {
            isFixed: function() {
                return this.position > this.fixedHeight;
            },
            fixedHeight: function() {
                return this.height.headerNav 
                        + this.height.signboard 
                        + this.height.toolPalette;
            },
            filteredCalendar: function () {
                const self = this;
                let data = this.$store.state.calendar.data.calendars;
//                let filterWord = this.searchQuery && this.searchQuery.toLowerCase();
                let filterWord = this.query.search && this.query.search.toLowerCase();

                if(! filterWord) {
//                    filterWord = this.internalQuery;
                    filterWord = this.query.internal;
                    if(filterWord) {
                        data = data.filter(function (row) {
                            return self.getDayIndex(row['date']) == filterWord;
                        });
                    }
                    return data;
                }
                return data;
            },
        },

        data() {
            return {
                position: 0,
                query: {
                    search: '',
                    internal: ''
                },
                height: {
                    headerNav: 0,
                    signboard: 0,
                    toolPalette: 0
                },
            }
        },

        methods: {
            updateHeight: function() {
                this.height.headerNav = document.getElementById('headerNav').clientHeight;
                this.height.signboard = document.getElementById('signboard').clientHeight;
                this.height.toolPalette = 0;

                if(this.$route.path == '/calendar/view' && this.isToolPaletteOpen) {
                    this.height.toolPalette = document.getElementById('tool-palette').scrollHeight -2;
                }
            },

            onScrollHeader() {
                u.clog('onScrollHeader()');
                window.body.scrollLeft = window.header.scrollLeft;
            },

            onScrollBody() {
                u.clog('onScrollBody()');
                window.header.scrollLeft = window.body.scrollLeft;
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
            }
        },
    }
</script>

<style>
.main-calendar-panel-wrapper {
    position: relative;
}
.main-calendar-panel-header {
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    height: 36px;
}
.main-calendar-panel {
    user-select: none;
    overflow-x: auto;
/*    overflow-y: scroll; */
    position: relative;
    height: 100%;
/*    height: 100vh; */
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
