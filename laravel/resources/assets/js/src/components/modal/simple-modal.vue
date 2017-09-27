<template>
<!--
<modal :blackScreenColor="blackScreenColor" :isActive="isActive">
    <div class="modal-card">

        <button class="modal-close is-large" aria-label="close"
            style="position: absolute;
                    top: 20px;
                    right: 20px;
                    background-color: rgba(84, 110, 122, 0.5);
                    z-index: 1;
            "
            @click="onClose()"
        ></button>

        <slot></slot>
    </div>
</modal>
-->
<transition name="modal-fade">
    <div class="modal is-active" v-if="isActive">
        <div class="modal-background"
             :style="{'background-color': blackScreenColor}"
        ></div>

        <div class="modal-card">
            <button class="modal-close is-large" aria-label="close"
                style="position: absolute;
                        top: 20px;
                        right: 20px;
                        background-color: rgba(84, 110, 122, 0.5);
                        z-index: 1;
                "
                @click="onClose()"
            ></button>
            <slot></slot>
        </div>
    </div>
</transition>
</template>

<script>
//import modal from './modal.vue';

export default {
//    components: { modal },
    props: {
        blackScreenColor: { type: String, default: 'rgba(10,10,10,0.85)' },
        isActive: { type: Boolean, required: true },
        onClose: { type: Function, required: true },
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
