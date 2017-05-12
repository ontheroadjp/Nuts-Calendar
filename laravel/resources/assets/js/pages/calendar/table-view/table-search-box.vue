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
import { mapState } from 'vuex';

export default {
    methods: {
        clearField() {
            this.$store.commit('setSearchQuery', '');
        },
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
        }),

//        ...mapMutations({
//            setQuery: (state, val) => state.commit('setSearchQuery', val),
//        }),

        searchQuery: {
            get() {
                return this.$store.state.calendar.behavior.query.search;
            },
            set(val) {
                this.$store.commit('setSearchQuery', val);
            }
        },
    }
}
</script>
