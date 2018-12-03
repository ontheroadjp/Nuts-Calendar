<template>
    <div class="control">

        <div class="control has-icon has-addons" style="font-size: 0.9rem;">
            <input class="input"
                type="text"
                v-model="query"
                style="font-size: 0.9rem;"
                :placeholder="t('calendarToolPalette.search')"
                :disabled="disabled" />

            <span class="icon is-small">
                <i class="fa fa-search"></i>
            </span>

            <!--
            <a :class="['button', theme.secondary.class, 'is-outlined']"
                @click="clearField"
            >Clear</a>
            -->

            <a style="position: absolute; top: 4px; right: 10px; font-size: 1rem;"
                @click="clearField">
                <i class="fa fa-times-circle"></i>
            </a>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../../mixins/core.js';

export default {
    mixins: [ core ],

    props: {
        disabled: { type: Boolean, default: false }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('calendar/tableView/toolPalette', {
            searchQuery: state => state.query.search
        }),

        query: {
            get() {
                return this.searchQuery;
            },

            set(value) {
                this.setSearchQuery({ value });
            }
        }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            setSearchQuery: 'setSearchQuery'
        }),

        clearField() {
            this.setSearchQuery({ value: '' });
        }
    }
}
</script>
