<template>
    <simple-modal v-if="isActive" :opacity="parseFloat(0.4)" :onClose="clickClose">
        <edit-modal-content
            :userCalendar="userCalendar"
        ></edit-modal-content>
    </simple-modal>
</template>

<script>
import simpleModal from '../../../components/simple-modal.vue';
import editModalContent from './edit-modal-content.vue';

export default {
    components: { simpleModal, editModalContent },

    props: {
        userCalendar: { type: Object, required: true },
        isActive:     { type: Boolean, required: true }
    },

    methods: {
        clickClose: function() {
            this.$emit('update:isActive', false);
        }
    }
};
</script>
