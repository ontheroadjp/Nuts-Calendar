<template>
    <div id="fc-calendar">

        <!-- display:none -->
        <nuts-alert></nuts-alert>

        <nuts-members-modal name="members-modal">
            <nuts-member-tabs></nuts-member-tabs>
        </nuts-members-modal>

        <!-- hero -->
        <fc-calendar-hero></fc-calendar-hero>

        <!-- button-panel -->
        <div style="margin: 20px 20px 20px 20px;">
<!--
            <nuts-members-modal-button 
                emit="open-members-modal" 
                @click="clickAddMemberButton()"
            >Add New Member</nuts-members-modal-button>

            <nuts-search-box></nuts-search-box>
-->
            <div class="trash"
                v-show="tableViewBody.draggingItem" 
                @dragOver="handleDragOverTrash($event)"
                @dragLeave="dropInTrash = false"
                @drop="handleDropTrash($event)"
            > TRASH
            </div>

        </div>

        <!-- calendar-panel -->
        <div class="main-calendar-panel-wrapper">

            <div class="main-calendar-panel-header">

                <table-view name="tableViewHeader" body="false"></table-view>
            </div>
    
            <div class="main-calendar-panel">

                <table-view name="tableViewBody" header="false"></table-view>
            </div>

        </div>

    </div>
</template>

<script>

    // componennt
    import fcCalendarHero from '../components/FcCalendarHero.vue';
    import fcCalendarTableView from '../components/FcCalendarTableView.vue';
    import nutsSearchBox from '../nuts-vue-components/NutsSearchBox.vue';

    import nutsAlert from '../nuts-vue-components/NutsAlert.vue';
    import nutsButton from '../nuts-vue-components/NutsButton.vue';
    import nutsModal from '../nuts-vue-components/NutsModal.vue';
    import fcMemberTabs from '../components/FcMemberTabs.vue';

    export default {

        components: {
            'fc-calendar-hero': fcCalendarHero,
            'table-view': fcCalendarTableView,
//            'event-list-view': fcEventListView,
            'nuts-search-box': nutsSearchBox,
            'nuts-alert': nutsAlert,
            'nuts-members-modal-button': nutsButton,
            'nuts-members-modal': nutsModal,
            'nuts-member-tabs': fcMemberTabs,
        },

        data() {
            return {
                searchQuery: '',
                dropInTrash: false,
            }
        },

        computed: {

            tableViewBody: function() {
                const components = this.$children.filter(function(item,index){
                    if(item.name == 'tableViewBody') 
                        return true
                });
                return components[0];
            },

            currentCalendarId: function() {
                return this.$store.state.currentCalendarId;
            },

            currentYear: function() {
                return this.$store.state.currentYear;
            },

            currentMonth: function() {
                return this.$store.state.currentMonth;
            },

            newColumnKey: function() {
                return this.$store.getters.newColumnKey;
            }
        },

        methods: {
            handleDragOverTrash: function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                this.dropInTrash = true;
            },

            handleDropTrash: function(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                const cellItems = this.tableViewBody.draggingItemFrom;
                const item = this.tableViewBody.draggingItem;
                const itemIndex = this.tableViewBody.draggingItemIndex;

                this.$store.dispatch('deleteItem', {
                    'cellItems': cellItems,
                    'item': item,
                    'itemIndex': itemIndex
                });

                this.dropInTrash = false;

                return false;
            },

            clickAddMemberButton: function() {
                this.$store.commit('setMembersModalIsActive', true);
                this.$store.commit('setMembersModalSelectedTab', this.newColumnKey);
            }
        },

        watch: {
            'currentCalendarId': {
                handler: function(new_val, old_val) {
                    if( old_val != '' ) {
                        u.clog('watch: currentCalendarId');
                        this.$store.dispatch('fetchCalendar', {
                            'route': this.$route
                        });
                    }
                },
                deep: true
            },

            'currentYear': {
                handler: function(new_val, old_val) {
                    u.clog('watch: currentYear');
                    this.$store.dispatch('fetchCalendar', {
                        'route': this.$route
                    });
                },
                deep: true
            },

            'currentMonth': {
                handler: function(new_val, old_val) {
                    u.clog('watch: currentMonth');
                    this.$store.dispatch('fetchCalendar', {
                        'route': this.$route
                    });
                },
                deep: true
            },
        },

        ready() {
//            this.$store.dispatch('fetchUserCalendar');
            this.$store.dispatch('fetchCalendar', {
                'route': this.$route
            });
        },

    }
</script>

<style>
.main-calendar-panel-header {
    user-select: none;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    top: 325px;
    right: 0;
    bottom: 0;
    left: 0;
}
.main-calendar-panel {
    user-select: none;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: scroll;
    position: absolute;
    top: 360px;
    right: 0;
    bottom: 0;
    left: 0;
} 
.trash {
    background: whitesmoke;
    position: absolute;
    right: 0;
    left: 0;
    height: 70px;
    top: 232px;
    text-align: center;
    border-radius: 10px;
    border: 4px dotted;
}
</style>
