<template>
    <simple-modal :opacity="parseFloat(0.4)" :onClose="onClose" v-show="isActive">
        <edit-modal-content :onClose="onClose" :isActive="isActive"></edit-modal-content>
    </simple-modal>
</template>

<script>
import simpleModal from '../../../components/modal/simple-modal.vue';
import editModalContent from './edit-modal-content.vue';

export default {
    components: { simpleModal, editModalContent },

    props: {
        isActive: { type: Boolean, required: true },
        onClose:  { type: Function, required: true }
    }
};
</script>
