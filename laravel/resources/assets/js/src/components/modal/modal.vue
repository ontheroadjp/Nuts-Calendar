<template>
    <transition name="modal-fade">
        <div class="modal is-active" v-if="isActive">
            <div class="modal-background"
                 :style="[style.blackScreenColor]"
            ></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal-base',

        props: {
            opacity:  { type: Number, default: 0.85 },
            isActive: { type: Boolean, required: true }
        },

        computed: {
            style: function() {
                return {
                    blackScreenColor: {
                        'background-color': `rgba(10, 10, 10, ${this.opacity})`
                    }
                }
            }
        }
    }
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
