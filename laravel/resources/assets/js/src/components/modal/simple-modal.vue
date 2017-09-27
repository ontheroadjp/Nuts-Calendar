<template>
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
</template>

<script>
import modal from './modal.vue';

export default {
    components: { modal },
    props: {
        blackScreenColor: { type: String, default: 'rgba(10,10,10,0.85)' },
        isActive: { type: Boolean, required: true },
        onClose: { type: Function, required: true },
    }
};
</script>
