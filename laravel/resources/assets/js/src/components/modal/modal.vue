<template>
    <transition name="modal-fade">
        <div class="modal is-active" v-if="isActive">
            <div class="modal-background"
                 :style="{'background-color': blackScreenColor}"
            ></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        blackScreenColor: { type: String, default: 'rgba(10,10,10,0.85)' },
        isActive: { type: Boolean, required: true }
    }
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.4s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}
</style>
