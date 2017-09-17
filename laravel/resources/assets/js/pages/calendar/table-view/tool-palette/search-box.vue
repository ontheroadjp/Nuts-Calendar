<template>
    <div class="control">

        <div class="control has-icon has-addons">
            <input class="input" 
                type="text" 
                v-model="query" 
                placeholder="Search"
                :disabled="disabled" />

            <span class="icon is-small">
                <i class="fa fa-search"></i>
            </span>

            <a :class="['button', theme.secondary.class, 'is-outlined']" 
                @click="clearField"
            >Clear</a>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
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
