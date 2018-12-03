<template>
<span class="level" style="font-size: 0.9rem;" >
    <span class="level-item select">
        <!-- <select v-model="" :disabled="disabled"> -->
        <select :style="style.yearSelector" :disabled="disabled">
            <option value="2017" :selected="currentYear == 2017">2017年</option>
            <option value="2018" :selected="currentYear == 2018">2018年</option>
            <option value="2019" :selected="currentYear == 2019">2019年</option>
            <option value="2020" :selected="currentYear == 2020">2020年</option>
        </select>
    </span>

    <button
        class="button"
        @click="setCurrentMonth('01')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 1 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">1月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('02')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 2 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">2月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('03')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 3 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">3月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('04')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 4 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">4月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('05')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 5 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">5月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('06')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 6 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">6月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('07')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 7 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">7月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('08')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 8 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">8月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth('09')"
        style="font-size: 0.9rem;"
        :style="currentMonth == 9 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">9月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth(10)"
        style="font-size: 0.9rem;"
        :style="currentMonth == 10 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">10月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth(11)"
        style="font-size: 0.9rem;"
        :style="currentMonth == 11 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">11月</span>
    </button>

    <button
        class="button"
        @click="setCurrentMonth(12)"
        style="font-size: 0.9rem;"
        :style="currentMonth == 12 ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">12月</span>
    </button>

</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../../mixins/core.js';

export default {
    mixins: [ core ],

    props: {
        disabled: { type: Boolean, default: false }
    },

    data() {
        return {
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        currentYear: {
            get() {
                return this.$store.state.calendar.currentYear;
            },

            set(value) {
                this.$store.commit('calendar/SET_VALUE', {
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
                this.$store.commit('calendar/SET_VALUE', {
                    key: 'currentMonth',
                    value: value
                });
            }
        },

        style: function() {
            return {
                yearSelector: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                },

                selectedMonth: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        }
    },

    methods: {
        ...mapActions('calendar', {
            setCurrentYear: 'setCurrentYear',
            setCurrentMonth: 'setCurrentMonth'
        }),

        ...mapActions('calendar/tableView/toolPalette', {
            setInternalQuery: 'setInternalQuery'
        }),

        clickMonth: function(value) {

        }
    }
}
</script>

<style lang="scss" scoped>
.select select:focus {
    border: none;
    box-shadow: none;
}

.button:focus, .button.is-focused {
    border-color: #dbdbdb;
    box-shadow: none;
}

.date-label {
    font-size: 0.8em;
}
</style>
