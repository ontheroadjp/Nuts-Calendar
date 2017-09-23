<template>
    <transition name="modal-fade">
        <div class="modal is-active">
            <div class="modal-background" 
                 :style="[style.blackScreenOpacity]"
            ></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal-base',

        props: {
            opacity: { type: Number, default: 0.85 }
        },

        computed: {
            style: function() {
                return {
                    blackScreenOpacity: {
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
