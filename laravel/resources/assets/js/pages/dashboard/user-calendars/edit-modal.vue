<template>
    <simple-modal v-if="isActive" :opacity="parseFloat(0.4)" :onClose="clickClose">
        <user-calendar-modal-content
            :userCalendar="userCalendar"
        ></user-calendar-modal-content>
    </simple-modal>
</template>

<script>
import simpleModal from '../../../components/simple-modal.vue';
import userCalendarModalContent from './edit-modal-content.vue';

export default {
    components: {
        simpleModal,
        userCalendarModalContent
    },

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
