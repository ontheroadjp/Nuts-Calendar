<template>
    <transition name="modal-fade"
        <div class="modal is-active">
            <div class="modal-background"></div>
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped>
    .modal-fade-enter-active, .modal-fade-leave-active {
        transition: all .4s ease;
    }
    .modal-fade-enter, .modal-fade-leave-to {
        opacity: 0;
    }
</style>
