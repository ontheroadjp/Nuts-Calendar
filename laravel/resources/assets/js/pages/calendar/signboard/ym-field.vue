<template>
<div>
    <transition name="ym-picker">
        <span v-if="!editing" 
            class="thin" 
            style="font-size: 1.8em; color: #fff"
            @click="togglePicker" 
        >{{ getYearAndMonth(currentYear + '-' + currentMonth + '-01') }}</span>

        <div v-else class="card thin ym-picker">
            <button class="delete delete-button" @click="togglePicker"></button>

            <div class="header">
                <div><a @click="currentYear = currentYear - 1"><<</a></div>
                <div>{{ currentYear }}</div>
                <div><a @click="currentYear = currentYear + 1">>></a></div>
            </div>
    
            <div class="row">
                <div v-for="m in monthVals" class="item">
                    <a @click="currentMonth = m; editing = false">{{ m }}月</a>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import dateUtilities from '../../../mixins/date-utilities.js';

export default {
    mixins: [
        dateUtilities
    ],

//    props: {
//        yearFrom: {
//            type: Number,
//            default: 2017
//        }, 
//
//        yearPeriod: {
//            type: Number,
//            default: 5
//        }
//    },

    data() {
        return {
            editing: false,
            monthVals: [
                '01','02','03','04','05','06',
                '07','08','09','10','11','12'
            ]
        }
    },

    computed: {
        currentYear: {
            get() {
                return this.$store.state.calendar.currentYear;
            },

            set(value) {
                this.$store.commit('calendar/setValue', {
                    key: 'currentYear', 
                    value: value
                });
            }
        },

        currentMonth: {
            get() {
                return this.$store.state.calendar.currentMonth;
            },

            set(value) {
                this.$store.commit('calendar/setValue', {
                    key: 'currentMonth', 
                    value: value
                });
            }
        },

//        yearVals: function() {
//            let start, period, vals = [];
//            this.yearFrom ? start = this.yearFrom : start = this.currentYear;
//            this.yearPeriod ? period = this.yearPeriod : period = 5;
//            for( var n=0; n < period; n++ ) {
//                vals.push(parseInt(start) + n);
//            }
//            return vals;
//        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    },

    methods: {
        togglePicker: function() {
            this.editing = !this.editing;
            this.$store.commit('dashboard/setValue', {
                key: 'disabled', value: this.editing
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.ym-picker {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background-color: #b688ff;
    color: #e4f7ff;
    align-items: center;
    font-size: 0.8rem;
    height: 60px;
    position: absolute;
    width: 100%;
    right: 0;
    top: 20px;
    padding: 5px 10px;
    border-radius: 3px;
    width: 60%;

    & .delete-button {
        position: absolute;
        top: 3px;
        right: 3px;
    }

    & .header {
        display: flex;
        justify-content: space-around;
        width: 100%;
        align-items: center;

        & a:hover {
            font-weight: bold;
        }
    }
    
    & .row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        background-color: #f2f2f2;
        color: #363636;
        align-items: center;
        border-radius: 3px;
        width: 100%;
        padding: 0 10px;
        height: 23px
    } 
   
    & .item {
        width: 75px;
        text-align: center;
        padding: 6px;
        
        &:hover {
            border: 1px solid #e6e6e6;
            background-color: #7058a3;
            border-radius: 15px;
            padding: 5px;
            color: white;
        }
    }
}

.ym-picker-enter-active, .ym-picker-leave-active {
    transition: all .2s ease;
}

.ym-picker-leave-active {
    transition: all .5s ease;
}

.ym-picker-enter, .ym-picker-leave-to {
    opacity: 0;
    width: 0;
}

.ym-picker-leave, .ym-picker-enter-to {
    opacity: 1;
}
</style>
