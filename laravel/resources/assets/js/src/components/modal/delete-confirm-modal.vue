<template>
    <simple-modal :blackScreenColor="blackScreenColor" :onClose="onClose" :isActive="isActive">
        <div id="delete-confirm-modal"
            class="card"
            style="transition: height 0.3s ease;">

            <delete-confirm-slide-panel
                :isActive="showDeleteConfirm"
                :height="slideHeight"
                @cancel="clickDeleteCancel()"
                @ok="clickDeleteOK()"
            ></delete-confirm-slide-panel>

            <notification-slide-panel
                :isActive="deleteResult !== ''"
                :type="deleteResult !== '' ? deleteResult : 'success'"
                :height="slideHeight"
                @close="close()"
            ></notification-slide-panel>

            <slot></slot>

            <div class="modal-footer">
                <div v-show="!showDeleteConfirm" class="button-panel">
                    <button class="button strip thin"
                        @click="clickDeleteButton"
                        :disabled="isLoading"
                    >Delete</button>
                </div>
            </div>

        </div>
    </simple-modal>
</template>

<script>
import simpleModal from './simple-modal.vue';
import deleteConfirmSlidePanel from '../slide-panel/delete-confirm-slide-panel.vue';
import notificationSlidePanel from '../slide-panel/notification-slide-panel.vue';

export default {
    components: { simpleModal, deleteConfirmSlidePanel, notificationSlidePanel },

    props: {
        slideHeight: { type: String, default: '150px' },
        blackScreenColor: { type: String, default: 'rgba(10,10,10,0.85)' },
        isActive: { type: Boolean, required: true },
        onClose:  { type: Function, required: true },
        deleteResult: { type: String, default: '' } // should be use with .sync option
    },

    data() {
        return {
            modalHeight: '',
            modalHeightWhenSlideOpened: '160px',
            showDeleteConfirm: false,
            isLoading: false,
        }
    },

    methods: {
        clickDeleteButton: function() {
            const el = document.getElementById('delete-confirm-modal');
            if(!el) return;

            this.modalHeight = el.clientHeight;
            el.style.height = this.modalHeightWhenSlideOpened;
            this.showDeleteConfirm = true;
        },

        clickDeleteCancel: function() {
            const el = document.getElementById('delete-confirm-modal');
            if(!el) return;

            el.style.height = this.modalHeight + 'px';
            this.showDeleteConfirm = false
        },

        clickDeleteOK() {
            this.$emit('onDeleteOK');
        },

        close: function() {
            this.onClose();
            setTimeout(() => {
                this.showDeleteConfirm = false;
                this.$emit('update:deleteResult');
            }, 1000);
        },

        setModalHeight: function() {
            const el = document.getElementById('delete-confirm-modal');
            if(!el) return;
            this.modalHeight = el.clientHeight;
            el.style.height = el.clientHeight + 'px';
        }
    },

    watch: {
        isActive: function() {
            this.$nextTick(() => {
                this.setModalHeight();
            });
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

.button-panel {
    display: flex;
    justify-content:
    flex-end;
    width: 95%;
}
</style>
