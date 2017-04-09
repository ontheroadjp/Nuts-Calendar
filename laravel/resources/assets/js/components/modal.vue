<template>
    <div class="modal is-active" v-show="isActive" transition="modal-fade">
        <div class="modal-background"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'isActive'
    ]
}
</script>

<style>
    .modal-fade-transition {
        transition: all .4s ease;
    }
    .modal-fade-enter, .modal-fade-leave {
        opacity: 0;
    }
</style>
