<template>
    <div class="modal is-active" transition="modal-fade">
        <div class="modal-background"></div>
        <slot></slot>
    </div>
</template>

<style scoped>
    .modal-fade-transition {
        transition: all .4s ease;
    }
    .modal-fade-enter, .modal-fade-leave {
        opacity: 0;
    }
</style>
