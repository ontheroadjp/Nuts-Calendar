<template>
    <div class="control is-grouped is-pulled-right">

        <div class="control has-icon">
            <input v-model="$parent.$data.searchQuery" class="input" type="text" placeholder="Search">
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
                this.$parent.$data.searchQuery = ''
            }
        },

        created() {
            const self = this;

            this.$root.$on('nuts-select-main-menu', function(index) {
                self.clearField();
            });
        },
    }
</script>

<style>
    
</style>
