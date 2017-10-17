<template>
<notification-modal
    blackScreenColor="rgba(10,10,10,0.45)"
    :onClose="close"
    slideHeight="150px"
    bgColor="#fff"
    :isActive="isActive"
    :isShowNotification="insertResult !== ''"
    :type="insertResult !== '' ? insertResult : 'success'"
>
    <div class="card" style="padding: 43px;">
        <text-input
            :id="textInputId.name"
            inputStyle="font-size: 2rem; font-weight: 200;"
            :showError="false"
            :minTextLength="1"
            :height="110"
            placeholder="Member/Role name"
            @changeValue="changeName"
            :disabled="false"
        ></text-input>
        <text-input
            :id="textInputId.description"
            :showError="false"
            :minTextLength="1"
            :height="110"
            placeholder="Description"
            @changeValue="changeDescription"
            :disabled="false"
        ></text-input>
    </div>

    <div v-show="insertResult === ''"
         class="modal-footer"
         style="display: flex; justify-content: flex-end; width: 95%;"
    >
        <button
            class="button strip thin"
            @click="close()"
            :disabled="isLoading"
        >Cancel</button>
        <button
            class="button strip thin"
            @click="clickCreate()"
            :disabled="!isReady"
        >Create</button>
    </div>
</notification-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import notificationModal from '../../../components/modal/notification-modal.vue';
import textInput from '../../../components/form/text-input.vue';

export default {
    components: { notificationModal, textInput },

    props: {
        onClose: { type: Function, required: true },
        isActive: { type: Boolean, required: true }
    },

    data() {
        return {
            insertResult: '',
            isLoading: false,

            textInputId: {
                name: 'create-new-member-name-input',
                description: 'create-new-member-description-input'
            },

            input: {
                name: '',
                description: ''
            }
        }
    },

    computed: {
        isReady: function() {
            return this.input.name.length;
        }
    },

    methods: {
//        ...mapActions('userCalendar/insert', {
//            setInsertValue: 'setInsertValue',
//            insert: 'insert'
//        }),

        ...mapActions('member/insert', {
            setInsertValue: 'setInsertValue',
            insert: 'insert'
        }),

        changeName(data) {
            this.input.name = data.inputValue;
        },

        changeDescription(data) {
            this.input.description = data.inputValue;
        },

        clickCreate() {
            if(!this.isReady) return;
            this.setInsertValue({ key: 'name', value: this.input.name });
            this.setInsertValue({ key: 'description', value: this.input.description });
            this.insert({
                notify: false,

                successCb: () => {
                    this.insertResult = 'success';
                },

                failedCb: () => {
                    this.insertResult = 'failed';
                }
            });
        },

        close() {
            this.insertResult = '';
            setTimeout(() => {
                let el = document.getElementById(this.textInputId.name);
                if(el) el.value = '';

                el = document.getElementById(this.textInputId.description);
                if(el) el.value = '';
            }, 1000);
            this.input.name = '';
            this.input.description = '';
            this.onClose();
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-footer {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    padding: 5px;
    text-align: right;

    & button:hover {
        border: 1px solid #e6e6e6;
    }
}
</style>
