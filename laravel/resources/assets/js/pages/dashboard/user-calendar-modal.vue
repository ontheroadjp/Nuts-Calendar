<template>
    <simple-modal v-if="isActive" :opacity="parseFloat(0.4)" :onClose="clickClose">
        <user-calendar-modal-content
            :userCalendar="userCalendar"
        ></user-calendar-modal-content>
    </simple-modal>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import simpleModal from '../../components/simple-modal.vue';
import userCalendarModalContent from './user-calendar-modal-content.vue';

export default {
    components: {
        simpleModal,
        userCalendarModalContent
    },

    props: {
        userCalendar: { type: Object, required: true },
        isActive:     { type: Boolean, required: true }
    },

//    data() {
//        return {
//            editingId: '',
//        }
//    },

//    computed: {
////        ...mapState({
////            theme: state => state.app.theme
////        }),
//
////        ...mapState('userCalendar', {
////            updateState: state => state.update
////        }),
//
////        ...mapState('member', {
////            members: state => state.data.members
////        }),
//
////        ...mapState('userCalendarMember', {
////            userCalendarMembers: state => state.data.userCalendarMembers
////        })
//    },

    methods: {
//        ...mapMutations('userCalendar/update', {
//            setUpdateValue: 'setUpdateValue'
//        }),

//        ...mapActions('userCalendar/update', {
////            updateName: 'updateName',
////            updateDescription: 'updateDescription'
//        }),

        clickClose: function() {
            this.$emit('update:isActive', false);
        },

//        clickSaveName: function() {
//            u.clog('clickSave()');
//            this.updateName(this.userCalendar.id);
//        },

//        clickSaveDescription: function() {
//            u.clog('clickSave()');
//            this.updateDescription(this.userCalendar.id);
//        },

//        clickUndo: function() {
//            this.input.name = this.userCalendar.name;
//            this.input.description = this.userCalendar.description;
//        }
    }
};
</script>

<style lang="scss" scoped>
/*
.members {
    margin: 10px 20px;
}
.member {
    line-height: 2.0rem;
}

.member-checkbox-label {
    margin: 0 5px;
}
*/
</style>
