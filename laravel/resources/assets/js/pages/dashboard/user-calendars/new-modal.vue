<<template>
<simple-modal :opacity="parseFloat(0.4)" :onClose="close">
    <div class="card">
        <div style="padding: 40px;">
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
    </div>

    <div class="modal-footer">
        <div v-show="!showSuccessNotification && !showErrorNotification"
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

        <transition name="notification">
            <div class="card notification"
                :style="
                    showSuccessNotification
                        ? 'background-color: #23d160'
                        : 'background-color: #ff3860'
                "
                v-show="showSuccessNotification || showErrorNotification"
            >
                <div style="
                    display: flex;
                    justify-content: center;
                    height: 75%;
                ">
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <i v-if="showSuccessNotification" class="fa fa-check-circle fa-3x"></i>
                        <i v-else-if="showErrorNotification" class="fa fa-exclamation-circle fa-3x"></i>
                    </div>
                </div>

                <div class="notification-buttons">
                    <button class="button strip"
                        style="color:#fff"
                        @click="close()"
                    >OK</button>
                </div>
            </div>
        </transition>
    </div><!-- // .dialog-footer -->

</simple-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import simpleModal from './../../../components/simple-modal.vue';
import textInput from './../../../components/form/text-input.vue';

export default {
    components: { simpleModal, textInput },

    props: {
        onClose: { type: Function, required: true }
    },

    data() {
        return {
            showSuccessNotification: false,
            showErrorNotification: false,
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
                    this.showErrorNotification = true;
                }
            });
        },

        close() {
            this.showSuccessNotification = false;
            this.showErrorNotification = false;
            setTimeout(() => {
                document.getElementById(this.textInputId.name).value = '';
                document.getElementById(this.textInputId.description).value = '';
            }, 1000);
            this.onClose();
        }
    }
}
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

.notification {
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 145px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.notification-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}

.notification-enter-active,
.notification-leave-active {
    transition: all .3s ease;
}

.notification-leave-to,
.notification-enter {
    height: 0;
    opacity: 0;
}

.notification-enter-to,
.notification-leave {
    opacity: 1;
    height: 145px;
}
</style>
