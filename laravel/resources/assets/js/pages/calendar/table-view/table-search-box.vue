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
            <a 
                :class="['button', theme.secondary.class, 'is-outlined']" 
                @click="clearField"
            >Clear</a>
        </div>

    </div>
</template>

<script>
export default {
    props: [
        'searchQuery'
    ],

    methods: {
        clearField() {
            this.$emit('update:searchQuery', '');
            //this.searchQuery = ''
        },
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },
    }
}
</script>
