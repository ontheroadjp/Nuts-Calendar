<template>
<!-- <icon-header-modal v-if="isActive" icon="fa-calendar" :onClose="clickClose"> -->
<simple-modal v-if="isActive" :opacity="parseFloat(0.4)" :onClose="clickClose">

        <user-calendar-modal-content
            :userCalendar="userCalendar"
        ></user-calendar-modal-content>
<!--
    <div slot="header">
        <inline-text-input
            id="calendar-name"
            inputClass="title thin-200"
            inputStyle=" color: #4a4a4a; margin-bottom: 15px"
            iconStyle="color: #000"
            placeholder="Calendar Name"
            :isLoading="updateState.isLoading.name"
            :syncValue.sync="inputName"
            :defaultValue="userCalendar.name"
            :saveCallback="clickSaveName"
            :editingId.sync="editingId"
        ></inline-text-input>

        <inline-text-input
            id="calendar-description"
            inputClass="subtitle thin"
            inputStyle="color: #000"
            iconStyle="color: #000"
            placeholder="Description"
            :isLoading="updateState.isLoading.description"
            :syncValue.sync="inputDescription"
            :defaultValue="userCalendar.description"
            :saveCallback="clickSaveDescription"
            :editingId.sync="editingId"
        ></inline-text-input>
    </div>
    <div slot="body">
        <label class="label thin-400">Members</label>
        <ul class="members">
            <li v-for="member in members" class="member">
                <input :id="member.name"
                    type="checkbox"
                    class="nuts-input-checkbox"
                    :checked="userCalendarMemberIds.indexOf(member.id) !== -1"
                    @change="changeMemberValue(
                        member.name,
                        userCalendar.id,
                        member.id
                    )"
                >
                <label :for="member.name"
                    class="member-checkbox-label"
                    style="display: inline;"
                >{{ member.name }}</label>
            </li>
        </ul>
    </div>
-->

</simple-modal>
<!-- </icon-header-modal> -->
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
//import iconHeaderModal from '../../components/icon-header-modal.vue';
import simpleModal from '../../components/simple-modal.vue';
import inlineTextInput from '../../components/inline-text-input.vue';

import userCalendarModalContent from './user-calendar-modal-content.vue';
import textInput from '../../components/text-input.vue';

export default {
    components: {
//        iconHeaderModal,
        simpleModal,
        inlineTextInput,
        textInput,
        userCalendarModalContent
    },

    props: {
        userCalendar: { type: Object, required: true },
        isActive: { type: Boolean, required: true }
    },

    data() {
        return {
            editingId: '',
//            userCalendarMemberIds: [],
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            updateState: state => state.update
        }),

        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('userCalendarMember', {
            userCalendarMembers: state => state.data.userCalendarMembers
        }),

        inputName: {
            get() {
                return this.updateState.updateValues.name;
            },

            set(value) {
                this.setUpdateValue({ key: 'name', value: value });
            }
        },

        inputDescription: {
            get() {
                return this.updateState.updateValues.description;
            },

            set(value) {
                this.setUpdateValue({ key: 'description', value: value });
            }
        }
    },

    methods: {
        ...mapMutations('userCalendar/update', {
            setUpdateValue: 'setUpdateValue'
        }),

        ...mapActions('userCalendar/update', {
            updateName: 'updateName',
            updateDescription: 'updateDescription'
        }),

//        ...mapActions('userCalendarMember/insert', {
//            insertUserCalendarMember: 'insert'
//        }),
//
//        ...mapActions('userCalendarMember/remove', {
//            removeUserCalendarMember: 'remove'
//        }),

        clickClose: function() {
            this.$emit('update:isActive', false);
        },

        clickSaveName: function() {
            u.clog('clickSave()');
            this.updateName(this.userCalendar.id);
        },

        clickSaveDescription: function() {
            u.clog('clickSave()');
            this.updateDescription(this.userCalendar.id);
        },

        clickUndo: function() {
            this.input.name = this.userCalendar.name;
            this.input.description = this.userCalendar.description;
        },

//        changeMemberValue(elementId, userCalendarId, memberId) {
////            const value = document.getElementById(elementId).checked;
//
//            if( document.getElementById(elementId).checked ) {
//                this.insertUserCalendarMember({ userCalendarId, memberId });
//            } else {
//                this.removeUserCalendarMember({ userCalendarId, memberId });
//            }
//        },

//        initUserCalendarMemberIds: function() {
//            const self = this;
//            this.userCalendarMembers.forEach( function( val ) {
//                if( val.user_calendar_id === self.userCalendar.id ) {
//                    self.userCalendarMemberIds.push(val.member_id);
//                }
//            });
//        }
    },

//    mounted() {
//        this.initUserCalendarMemberIds();
//    }
}
</script>

<style lang="scss" scoped>
.members {
    margin: 10px 20px;
}

.member {
    line-height: 2.0rem;
}

.member-checkbox-label {
    margin: 0 5px;
}
</style>
