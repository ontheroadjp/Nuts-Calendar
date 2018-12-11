<template>
    <button
        class="button"
        @click="clickButton(value)"
        style="font-size: 0.9rem;"
        :style="currentMonth == value ? style.selectedMonth : ''"
        :disabled="disabled"
        ><span class="date-label thin">{{ value }}月</span>
    </button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        value: { type: Number, required: true },
        disabled: { type: Boolean, default: false }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

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
                selectedMonth: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        }
    },

    methods: {
        ...mapActions('calendar', {
            setCurrentMonth: 'setCurrentMonth',
            fetchCalendar: 'fetchCalendar'
        }),

        clickButton(value) {
            this.setCurrentMonth(('00' + value).slice(-2));
            this.fetchCalendar();
        }
    }
}
</script>

<style lang="scss" scoped>
.button:focus, .button.is-focused {
    border-color: #dbdbdb;
    box-shadow: none;
}
</style>
