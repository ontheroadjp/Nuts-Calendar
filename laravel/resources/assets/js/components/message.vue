<template>
    <transition>
        <div class="message is-danger">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped>
    .message-fade-enter-active .message-fade-leave-active {
        transition: all .4s ease;
        width: 50%;
        position: fixed;
        top: 25%;
        left: 25%;
        transform: translateY(-50%);
        z-index: 99;
    }
    .message-fade-enter .message-fade-leave-to {
        opacity: 0;
    }
</style>
