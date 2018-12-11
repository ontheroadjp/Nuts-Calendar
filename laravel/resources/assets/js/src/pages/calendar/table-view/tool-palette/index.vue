<template>
<div id="tool-palette" class="tool-palette">
<div class="level" style="white-space: nowrap">

    <span class="level-left">
        <span class="level-item select">
            <select v-model="selected" class="thin" style="font-size: 0.9rem;" :disabled="disabled">
                <option value="calendar">カレンダー</option>
                <option v-show="viewMode === 'daily'" value="month">月</option>
                <option v-show="viewMode === 'daily'" value="date">{{ t('calendarToolPalette.date') }}</option>
                <option value="item">{{ t('calendarToolPalette.item') }}</option>
            </select>
        </span>

        <span v-show="selected === 'calendar'" class="level-item">
            <calendar-pane :disabled="disabled"></calendar-pane>
        </span>

        <span v-show="selected === 'month'" class="level-item">
            <month-pane :disabled="disabled"></month-pane>
        </span>

        <span v-show="selected === 'date' && viewMode === 'daily'" class="level-item">
            <date-pane :disabled="disabled"></date-pane>
        </span>
<!--
        <span v-show="selected === 'member'" class="level-item">
            <member-pane :disabled="disabled"></member-pane>
        </span>
-->
        <span v-show="selected === 'item'" class="level-item">
            <item-pane :disabled="disabled"></item-pane>
        </span>
    </span><!-- // .level-left -->

    <span class="level-right">
        <span class="level-item">
            <search-box :disabled="disabled"></search-box>
        </span>
    </span>

</div><!-- // .level -->
</div>
</template>

<script>
import { mapState } from 'vuex';
import core from '../../../../mixins/core.js';
import calendarPane from './calendar-pane.vue';
import monthPane from './month-pane.vue';
import datePane from './date-pane.vue';
//import memberPane from './member-pane.vue';
import itemPane from './item-pane.vue';
import searchBox from './search-box.vue';

export default {
    name: 'calendar-tool-palett',

//    components: { monthPane, datePane, memberPane, itemPane, searchBox },
    components: { calendarPane, monthPane, datePane, itemPane, searchBox },

    mixins: [ core ],

    data() {
        return {
            selected: 'calendar'
        }
    },

    computed: {
        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('calendar', {
            viewMode: state => state.viewMode,
            currentCalendarId: state => state.currentId,
            calendarIsLoading: state => state.isLoading
        }),

//        pointerEventsStyle: function() {
//            if( this.disabled ) return 'none';
//            return 'auto';
//        },
//
//        linkColorStyle: function() {
//            if( this.disabled ) return "rgba(242, 242, 242, 0.3)";
//            return "";
//        }
    },

    methods: {
        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
//            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentId',
                value: id
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.tool-palette {
    background:#f0f0f0;
    padding: 3px 5px;
    overflow: scroll;
}

.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {
    border-color: #dbdbdb;
    box-shadow: none;
}

</style>
