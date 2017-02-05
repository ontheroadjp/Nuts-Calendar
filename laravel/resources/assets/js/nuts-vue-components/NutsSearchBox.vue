<template>
    <div class="control is-pulled-right">

        <div class="control has-icon has-addons">
            <input 
                class="input" 
                type="text" 
                v-model="$parent.searchQuery" 
                placeholder="Search"
            >
            <span class="icon">
                <i class="fa fa-search"></i>
            </span>
            <a class="button is-info" @click="clearField">Clear</a>
        </div>

    </div>
</template>

<script>
    export default {

        methods: {
            clearField() {
                this.$parent.searchQuery = ''
            },
        },

    }
</script>

<style>
    
</style>
