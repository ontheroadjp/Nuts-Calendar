<<template>
<simple-modal :opacity="parseFloat(0.4)" :onClose="close">
    <div class="modal-header">
        <notification
            :type="showSuccessNotification ? 'success' : 'danger'"
            :message="showSuccessNotification ? 'SUCCESS' : 'FAILED'"
            height="150px"
            :isActive="showSuccessNotification || showFailedNotification"
            @close="close()"
        ></notification>
    </div>

    <div class="card" style="padding: 43px;">
        <text-input
            :id="textInputId.name"
            inputStyle="font-size: 2rem; font-weight: 200;"
            :showError="false"
            :minTextLength="1"
            :height="110"
            placeholder="Calendar name"
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

    <div v-show="!showSuccessNotification && !showFailedNotification"
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

</simple-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import simpleModal from './../../../components/modal/simple-modal.vue';
import textInput from './../../../components/form/text-input.vue';
import notification from './notification.vue';

export default {
    components: { simpleModal, textInput, notification },

    props: {
        onClose: { type: Function, required: true }
    },

    data() {
        return {
            showSuccessNotification: false,
            showFailedNotification: false,
            isLoading: false,

            textInputId: {
                name: 'create-new-calendar-name-input',
                description: 'create-new-calendar-description-input'
            },

            input: {
                name: '',
                description: ''
            }
        }
    },

    computed: {
        isReady: function() {
            return this.input.name.length > 1;
        }
    },

    methods: {
        ...mapActions('userCalendar/insert', {
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
                    this.showSuccessNotification = true;
                },

                failedCb: () => {
                    this.showFailedNotification = true;
                }
            });
        },

        close() {
            this.showSuccessNotification = false;
            this.showFailedNotification = false;
            setTimeout(() => {
                document.getElementById(this.textInputId.name).value = '';
                document.getElementById(this.textInputId.description).value = '';
            }, 1000);
            this.input.name = '';
            this.input.description = '';
            this.onClose();
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-header {
    position: absolute;
    top: 0;
    background-color: #fff;
    width: 100%;
    padding: 5px;
    text-align: right;
}

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
