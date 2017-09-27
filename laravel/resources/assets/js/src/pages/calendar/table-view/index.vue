<template>
<div class="main-calendar-panel-wrapper">

    <transition name="tool-palette">
        <tool-palette v-show="isToolPaletteOpen"></tool-palette>
    </transition>

    <div id="table-view">

        <black-screen
            v-if="disabled"
            bgColor="rgba(242, 242, 242, .6)"
            :onActive="function() {
                this.$store.commit('calendar/tableView/item/insert/reset');
            }"
        ></black-screen>

        <black-screen v-if="calendarIsLoading" :zIndex="999">
            <div class="loading-black-screen">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"
                    style="margin-bottom: .5em"></i>
                <div>is Loading...</div>
            </div>
        </black-screen>

        <div :id="id.header"
            :class="['main-calendar-panel-header', {sticky: isFixed}]"
            ><table-view
                :filtered-columns="filteredColumns"
                :isLoading="calendarIsLoading"
                :isFixed="isFixed"
            ></table-view>
        </div>

        <div :id="id.body"
             :class="['main-calendar-panel-body', {'sticky-offset': isFixed}]"
             @scroll="onScrollBody()"
            ><table-view
                :filtered-body="filteredBody"
                :isLoading="calendarIsLoading"
                :topPosition="(height.headerNav + height.signboard + height.toolPalette)"
                :scrollPositionY="scrollPositionY"
                :scrollPositionX="scrollPositionX"
            ></table-view>
        </div>
    </div>

    <!-- jump to the page top button -->
    <a
        v-show="scrollPositionY > fixedHeight && !draggingItem"
        class="button to-page-top"
        :style="'background-color: ' + theme.secondary.code"
        @click="clickToPageTop()"
        ><i class="fa fa-chevron-up" style="margin-top: -4px;"></i>
    </a>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    import blackScreen from '../../../components/black-screen.vue';
    import core from '../../../mixins/core.js';
    import tableView from './table-view.vue';
    import toolPalette from './tool-palette/index.vue';
    import dateUtilities from '../../../mixins/date-utilities.js';

    export default {
        components: { tableView, toolPalette, blackScreen },

        mixins: [ core, dateUtilities ],

        props: {
            calendarIsLoading: { type: Boolean, required: false }
        },

        data() {
            return {
                scrollPositionY: 0,
                scrollPositionX: 0,
                id: {
                    header: 'table-view-header',
                    body: 'table-view-body'
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
            ...mapState('dashboard', {
                disabled: state => state.disabled
            }),

            ...mapState('calendar/tableView/toolPalette', {
                isToolPaletteOpen: state => state.toolPalette.isActive,
                isEventItemShow: state => state.isEventItemShow,
                isTaskItemShow: state => state.isTaskItemShow,
                internalQuery: state => state.query.internal,
                searchQuery: state => (state.query.search).toLowerCase()
            }),

            ...mapState('calendar/tableView/item/dnd', {
                draggingItem: state => state.draggingItem
            }),

            isFixed: function() {
                return this.scrollPositionY > this.fixedHeight;
            },

            fixedHeight: function() {
                return this.height.headerNav
                        + this.height.signboard
                        + this.height.toolPalette;
            },

            filteredColumns: function() {
                return this.$store.getters.filteredMembers;
            },

           filteredBody: {
                cache: true,
                get() {
                    let data = this.$store.state.calendar.data.calendars;

                    // filter by search words
                    if(this.searchQuery) {
                        data = data.slice().filter( day => {
                            return this.getItemContentsAsString(day).indexOf(this.searchQuery) > -1;
                        });
                    }

                    // filter by a day of week
                    if(this.internalQuery) {
                        data = data.slice().filter( row => {
                            return this.getDayIndex(row['date']) == this.internalQuery;
                        });
                    }

                    return data;
                }
            }
        },

        methods: {
            getItemContentsAsString: function(day) {
                let result = '';
                let columns = day.items;
                const memberIds = Object.keys(columns);

                memberIds.forEach((id) => {
                    const cellItems = columns[id];
                    cellItems.forEach((item) => {
                        if( item.type_id === 1 && this.isEventItemShow ) {
                            result += item.content.toLowerCase() + ' ';
                        } else if( item.type_id === 2 && this.isTaskItemShow ) {
                            result += item.content.toLowerCase() + ' ';
                        }
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
                this.scrollPositionX = this.elements.tableBody.scrollLeft;
            },

            clickToPageTop: function () {
                for( let i = this.scrollPositionY; i > 0; i-- ) {
                    //document.documentElement.scrollTop = i;
                    document.body.scrollTop = i;
                }
            }
        },

        watch: {
            'isToolPaletteOpen': function() {
                setTimeout(this.updateHeight, 500);
            }
        },

        mounted() {
            this.$nextTick( () => {
                const self = this;
                this.updateHeight();

                document.onscroll = function(e) {
                    self.scrollPositionY = document.documentElement.scrollTop || document.body.scrollTop;
                };

                this.elements.tableHeader = document.getElementById(this.id.header);
                this.elements.tableBody = document.getElementById(this.id.body);
            });
        }
    }
</script>

<style lang="scss" scoped>
.main-calendar-panel-wrapper {
    position: relative;

    & .loading-black-screen {
        display: flex;
        justify-content: center;
        flex-flow: column wrap;
        align-items: center;
        margin-top: 10%;
        color: #546e7a;
    }

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

.to-page-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    color: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
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
