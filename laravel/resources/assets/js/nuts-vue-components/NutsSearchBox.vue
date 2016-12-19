<template>
    <div class="control is-grouped is-pulled-right">

        <div class="control has-icon">
            <input 
                class="input" 
                type="text" 
                v-model="$parent.searchQuery" 
                placeholder="Search"
            >
            <i class="fa fa-search"></i>
        </div>

        <div class="form-group">
            <a class="button is-primary is-outlined" @click="clearField">Clear</a>
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
