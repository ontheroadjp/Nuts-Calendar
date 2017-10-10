<template>
    <delete-confirm-modal
        blackScreenColor="rgba(10,10,10,0.45)"
        :onClose="onClose"
        :isActive="isActive"
        :deleteResult.sync="deleteResult"
        @onDeleteOK="clickDeleteOK()"
    >
        <div style="padding: 40px;">
            <text-input
                id="member-name"
                inputStyle="font-size: 2rem; font-weight: 200;"
                :initialValue="member.name"
                :showError="true"
                :minTextLength="1"
                :maxTextLength="30"
                :height="110"
                placeholder="Member/Role name"
                @blurValue="blurName"
                :disabled="false"
            ></text-input>
            <text-input
                id="description"
                :initialValue="member.description"
                :showError="true"
                :minTextLength="0"
                :maxTextLength="200"
                :height="110"
                placeholder="Description"
                @blurValue="blurDescription"
                :disabled="false"
            ></text-input>
        </div>
    </delete-confirm-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import textInput from '../../../components/form/text-input.vue';
import checkboxInput from '../../../components/form/checkbox.vue';
import deleteConfirmModal from '../../../components/modal/delete-confirm-modal.vue';

export default {
    components: { textInput, checkboxInput, deleteConfirmModal },

    props: {
        isActive: { type: Boolean, required: true },
        onClose:  { type: Function, required: true }
    },

    data() {
        return {
            deleteResult: ''
        }
    },

    computed: {
        ...mapState('member/update', {
            member: state => state.editingMember
        }),

        ...mapState('userCalendarMember', {
            userCalendarMembers: state => state.data.userCalendarMembers
        })
    },

    methods: {
        ...mapActions('member', {
            remove: 'remove/remove',
            update: 'update/update',
            setUpdateValue: 'update/setUpdateValue'
        }),

        blurName(data) {
            if(data.isReady) {
                this.setUpdateValue({ key: 'name', value: data.inputValue });
                this.update(false);
            }
        },

        blurDescription(data) {
            if(data.isReady) {
                this.setUpdateValue({ key: 'description', value: data.inputValue });
                this.update(false);
            }
        },

        changeMemberGroup(elementId, userCalendarId, memberId) {
            if( document.getElementById(elementId).checked ) {
                this.insertUserCalendarMember({ userCalendarId, memberId });
            } else {
                this.removeUserCalendarMember({ userCalendarId, memberId });
            }
        },

        clickDeleteOK: function() {
            this.remove({
                id: this.member.id,
                notify: false,
                successCb: () => {
                    this.deleteResult = 'success';
                },
                failedCb: () => {
                    this.deleteResult = 'failed';
                }
            });
        }
    }
};
</script>
