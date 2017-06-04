<template>
    <transition name="modal-fade">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal-base'
    }
</script>

<style scoped>
    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: all 0.2s ease;
    }

    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }
</style>
