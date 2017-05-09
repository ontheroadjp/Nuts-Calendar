<template>
    <div class="message is-danger" transition="message-fade">
        <slot></slot>
    </div>
</template>

<style scoped>
    .message-fade-transition {
        transition: all .4s ease;
        width: 50%;
        position: fixed;
        top: 25%;
        left: 25%;
        transform: translateY(-50%);
        z-index: 99;
    }
    .message-fade-enter, .message-fade-leave {
        opacity: 0;
    }
</style>
