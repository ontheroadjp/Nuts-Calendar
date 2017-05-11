<template>
    <transition>
        <div v-show="isActive" :class="'notification' + type">
            <button v-show="isImportant" class="delete" @click="close"></button>
            {{ message }}
        </div> 
    </transition>
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
    .alert-fade-enter-active, .alert-fade.leave-active {
        transition: all .4s ease;
        position: fixed;
        top: 10%;
        left: 20%;
        right: 20%;
        z-index: 99999;
    }
    .alert-fade-enter, .alert-fade.leave-to {
        opacity: 0;
    }
</style>
