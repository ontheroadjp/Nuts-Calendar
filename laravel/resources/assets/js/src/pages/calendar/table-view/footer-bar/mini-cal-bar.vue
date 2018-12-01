<template>
<transition name="mini-cal-bar-fade">
<div v-show="draggingItem && !isDropped" id="mini-cal-bar" :style="style.bar">

    <span v-for="yearLabel in yearLabels" class="tag" style="margin-left: 20px">
        {{ yearLabel + ': '}}
        <span
            v-if="yearLabel === monthLabel.split('-')[0]"
            v-for="monthLabel in monthLabels"
        >
            <span class="tag"
                :style="[
                    style.monthLabel,
                    onMiniCal === monthLabel ? style.labelSelected : '',
                    monthLabel === currentYear + '-' + currentMonth + '-01' ? style.thisMonth : ''
                ]"
                @dragenter="handleDragEnter(monthLabel)"
            >{{ labelString(monthLabel) }}

                <mini-cal
                    :isShow="onMiniCal === monthLabel"
                    :weeks="weeks"
                    :value="monthLabel"
                    :style="style.miniCal"
                ></mini-cal>

            </span>
        </span><!-- // v-for -->
    </span>

    <span class="icon">
        <i class="fa fa-trash"></i>
    </span>

</div>
</transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_ON_MINI_CAL } from '../../../../store/mutation-types.js';
import miniCal from '../../../../components/mini-cal.vue';
import moment from 'moment';
import chroma from 'chroma-js';

export default {
    components: {
        'mini-cal': miniCal
    },

    computed: {
        ...mapState({
            currentYear: state => state.calendar.currentYear,
            currentMonth: state => state.calendar.currentMonth,
            lang: state => state.app.lang,
            theme: state => state.app.theme
        }),

        ...mapState('calendar/tableView/item/dnd', {
            draggingItem: state => state.draggingItem,
            isDropped: state => state.isDropped,
            onMiniCal: state => state.onMiniCal
        }),

        yearLabels: function() {
            const m = moment(this.currentYear + this.currentMonth + '01').add(-6,'months');
            const labels = [];
            let prev = '';
            for(let i=0; i < 12; i++) {
                const next = m.add(1, 'months').format('YYYY');
                if( prev !== next ) {
                    labels.push(next);
                }
                prev = next;
            }
            return labels.sort();
        },

        monthLabels: function() {
            const m = moment(this.currentYear + this.currentMonth + '01').add(-6,'months');
            const labels = [];
            for(let i=0; i < 12; i++) {
                labels.push(m.add(1, 'months').format('YYYY-MM'));
            }
            return labels.sort();
        },

        weeks: function() {
            moment.locale(this.lang);
            //return moment.weekdaysShort();
            return moment.weekdaysMin();
        },

        style: function() {
            return {
                bar: {
                    'background-color': chroma(this.theme.primary.code).alpha(0.5).css('rgba'),
                    'position': 'fixed',
                    'bottom': 0,
                    'width': '100%',
                    'line-height': '2em'
                },
//                monthLabel: {
//                    'position': 'relative',
//                    'margin': '0.25em'
//                },
//                thisMonth: {
//                    'background-color': this.theme.secondary.code,
//                    'color': '#fff'
//                },
                labelSelected: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                },
                miniCal: {
                    'z-index': 9999,
                    'position': 'absolute',
                    'bottom': '30px',
                    'border': '2px solid' + this.theme.secondary.code
                }
            };
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/dnd', {
            setOnMiniCal: 'setOnMiniCal',
            dragOver: 'dragOver'
        }),

        labelString(monthLabel) {
            const m = moment(monthLabel);
            return m.format('MMM');
        },

        handleDragEnter: function(monthLabel) {
            u.clog('DRAG ENTER !!!!!!!(' + monthLabel + ')');
            this.setOnMiniCal({ value: monthLabel });
        }
    }
};
</script>

<style lang="scss" scoped>
    .mini-cal-bar-fade-enter-active,
    .mini-cal-bar-fade-leave-active {
        transition: all 0.3s ease;
    }

    .mini-cal-bar-fade-enter,
    .mini-cal-bar-fade-leave-to {
        opacity: 0;
    }
</style>
