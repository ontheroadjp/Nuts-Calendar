<template>
<div>
    <transition name="ym-picker">

        <!-- display value -->
        <span v-if="!editing"
            class="thin"
            :style="displayStyle"
            @click="togglePicker"
        >{{ getYearAndMonth(currentYear + '-' + currentMonth + '-01') }}</span>

        <!-- select bar -->
        <div v-else
            class="card thin ym-picker"
            :style="{ backgroundColor: theme.secondary.code }"
        >
            <button class="delete delete-button" @click="togglePicker"></button>

            <div class="header">
                <div><a @click="currentYear = currentYear - 1"><<</a></div>
                <div>{{ currentYear }}</div>
                <div><a @click="currentYear = currentYear + 1">>></a></div>
            </div>

            <div class="row">

                <div v-for="m in monthVals">
                    <a class="item"
                        @mouseover="
                                $event.target.style.border = '1px solid #e6e6e6';
                                $event.target.style.backgroundColor = theme.primary.code;
                                $event.target.style.borderRadius = '15px';
                                $event.target.style.padding = '5px';
                                $event.target.style.color = '#fff';
                            "
                         @mouseleave="
                                $event.target.style.border = '';
                                $event.target.style.backgroundColor = '';
                                $event.target.style.borderRadius = '';
                                $event.target.style.padding = '';
                                $event.target.style.color = '';
                            "
                        @click="currentMonth = m; togglePicker()"
                    >{{ m }}月</a>
                </div>

            </div>
        </div>
    </transition>
</div>
</template>

<script>
import { mapState } from 'vuex';
import dateUtilities from '../../../mixins/date-utilities.js';

export default {
    mixins: [
        dateUtilities
    ],

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
        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

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

//        hoverStyle: function() {
//            return {
//                border: '1px solid #e6e6e6',
//                backgroundColor: this.theme.primary.code,
//                borderRadius: '15px',
//                padding: '5px',
//                color: '#fff'
//            }
//        },

        displayStyle: function() {
            if( this.disabled ) {
                return {
                    fontSize: '1.8em',
                    color: 'rgba(242, 242, 242, .3)',
                    pointerEvents: 'none'
                }
            }

            return {
                fontSize: '1.8em',
                color: 'rgb(242, 242, 242)'
            }
        },

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
    width: 100%;

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
