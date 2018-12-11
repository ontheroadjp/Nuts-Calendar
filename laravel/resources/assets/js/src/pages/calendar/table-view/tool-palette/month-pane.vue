<template>
<span class="level" style="font-size: 0.9rem;" >
    <span class="level-item select">
        <select :style="style.yearSelector" :disabled="disabled">
            <option value="2017" :selected="currentYear == 2017">2017年</option>
            <option value="2018" :selected="currentYear == 2018">2018年</option>
            <option value="2019" :selected="currentYear == 2019">2019年</option>
            <option value="2020" :selected="currentYear == 2020">2020年</option>
        </select>
    </span>
    <span v-for="v in months">
        <month-button :value="v" :disabled="disabled"
        >{{ v }}</month-button>
    </span>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import monthButton from './month-pane-button.vue';
import core from '../../../../mixins/core.js';

export default {
    components: { monthButton },

    mixins: [ core ],

    props: {
        disabled: { type: Boolean, default: false }
    },

    data() {
        return {
            months: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
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

        style: function() {
            return {
                yearSelector: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        }
    },

    methods: {
        ...mapActions('calendar', {
            setCurrentYear: 'setCurrentYear',
        }),

        ...mapActions('calendar/tableView/toolPalette', {
            setInternalQuery: 'setInternalQuery'
        })
    }
}
</script>

<style lang="scss" scoped>
.select select:focus {
    border: none;
    box-shadow: none;
}

.date-label {
    font-size: 0.8em;
}
</style>
