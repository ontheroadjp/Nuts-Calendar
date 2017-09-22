<template>
    <simple-modal :opacity="parseFloat(0.4)" :onClose="onClose">
        <edit-modal-content :onClose="onClose"></edit-modal-content>
    </simple-modal>
</template>

<script>
import simpleModal from '../../../components/simple-modal.vue';
import editModalContent from './edit-modal-content.vue';

export default {
    components: { simpleModal, editModalContent },

    props: {
//        userCalendar: { type: Object, required: true },
        onClose:        { type: Function, required: true }
    }
};
</script>
