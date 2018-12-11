<template>
<span class="level-left" style="font-size: 0.9rem;" >
    <!--
    <span class="level-item select">
        <select @change="setCurrentYear(selectedYear)" v-model="selectedYear" class="thin" :disabled="disabled">
            <option value="2017">2017年</option> style="font-size: 0.9rem;"i
            <option value="2018">2018年</option>
            <option value="2019">2019年</option>
            <option value="2020">2020年</option>
        </select>
    </span>

    <span class="level-item select" v-show="viewMode === 'daily'">
        <select @change="setCurrentYear(selectedMonth)" v-model="selectedMonth" class="thin" :disabled="disabled">
            <option value="01">1月</option>
            <option value="02">2月</option>
            <option value="03">3月</option>
            <option value="04">4月</option>
            <option value="05">5月</option>
            <option value="06">6月</option>
            <option value="07">7月</option>
            <option value="08">8月</option>
            <option value="09">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
        </select>
    </span>

    <span style="background-color: #e6e3e3;
        padding: 2px;
        border-radius: 5px;
    ">
    -->
        <span v-for="uCalendar in userCalendar"
            @click="changeCalendar(uCalendar.id)">

            <router-link
                to="/calendar/view"
                tag="button"
                class="button thin hover-border"
                :class="{'strip': currentCalendarId != uCalendar.id && !disabled}"
                style="margin-right: 15px; font-size: 0.9rem;"
                :style="currentCalendarId == uCalendar.id ? {'background-color': '#fff'} : ''"
            >
                <span class="icon is-small">
                    <i v-if="!calendarIsLoading" class="fa fa-calendar"></i>
                    <i v-if="calendarIsLoading && currentCalendarId !== uCalendar.id"
                        class="fa fa-calendar"></i>
                    <i v-if="calendarIsLoading && currentCalendarId === uCalendar.id"
                        class="fa fa-refresh fa-spin"></i>
    <!--
                    <i v-if="currentCalendarId === uCalendar.id"
                        class="fa fa-calendar"></i>
                    <i v-if="calendarIsLoading && currentCalendarId === uCalendar.id"
                        class="fa fa-refresh fa-spin"></i>
    -->
                </span>
                <span>{{ uCalendar.name }}</span>
            </router-link>
        </span>
        <!-- </span> -->
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../../mixins/core.js';

const now = new Date();

export default {
    mixins: [ core ],

    props: {
        disabled: { type: Boolean, default: false }
    },

    data() {
        return {
            selectedYear: now.getFullYear(),
            selectedMonth: now.getMonth() + 1,
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            userCalendar: state => state.data.userCalendars
        }),

        ...mapState('calendar', {
            viewMode: state => state.viewMode,
            currentCalendarId: state => state.currentId,
            calendarIsLoading: state => state.isLoading
        }),

        style: function() {
            return {
                bgPrimary: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                },

                bgSecondary: {
                    'background-color': this.theme.secondary.code,
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

        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentId',
                value: id
            });
        },
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
    font-size: 0.9em;
}
</style>
