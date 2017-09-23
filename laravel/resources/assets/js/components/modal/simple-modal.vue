<template>
<modal :opacity="opacity">
    <div class="modal-card" style="background-color: red;">

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
        opacity: { type: Number, default: 0.85 },
        onClose: { type: Function, required: true }
    }
}
</script>
