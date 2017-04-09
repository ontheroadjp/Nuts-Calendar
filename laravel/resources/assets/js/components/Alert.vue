<template>
    <div v-show="isActive" transition="alert-fade" class="notification {{ type }}">
        <button v-show="isImportant" class="delete" @click="close"></button>
        {{ message }}
    </div> 
</template>

<script>
    export default {
        props: [
            'message', 'isImportant', 'type', 'isActive'
        ],

        methods: {
            close() {
                this.isActive = false;
                this.message = '';
                this.level = '';
            },
        },
    }
</script>

<style lang="sass">
    .alert-fade-transition {
        transition: all .4s ease;
        position: fixed;
        top: 10%;
        left: 20%;
        right: 20%;
        z-index: 99999;
    }
    .alert-fade-enter, .alert-fade.leave {
        opacity: 0;
    }
</style>
