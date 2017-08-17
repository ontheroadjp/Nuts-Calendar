<template>
    <div class="control">

        <div class="control has-icon has-addons">
            <input 
                class="input" 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search"
            >
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
    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        searchQuery: {
            get() {
                return this.$store.state.action.calendar.tableView.toolPalette.query.search;
            },
            set(value) {
                this.setSearchQuery({ value });
            }
        }
    },

    methods: {
        ...mapActions('action/calendar/tableView/toolPalette', {
            setSearchQuery: 'setSearchQuery'
        }),

        clearField() {
            this.setSearchQuery({ value: '' });
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
