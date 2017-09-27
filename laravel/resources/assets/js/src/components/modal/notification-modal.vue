<template>
    <simple-modal :blackScreenColor="blackScreenColor" :onClose="onClose" :isActive="isActive">
        <div id="notification-modal"
            class="card"
            style="transition: height 0.3s ease;">

            <notification-slide-panel
                :isActive="isShowNotification"
                :type="type"
                :height="slideHeight"
                @close="close()"
            ></notification-slide-panel>

            <slot></slot>

        </div>
    </simple-modal>
</template>

<script>
import simpleModal from './simple-modal.vue';
import notificationSlidePanel from '../slide-panel/notification-slide-panel.vue';

export default {
    components: { simpleModal, notificationSlidePanel },

    props: {
        slideHeight: { type: String, default: '150px' },
        blackScreenColor: { type: String, default: 'rgba(10, 10, 10, .85)' },
        isActive: { type: Boolean, required: true },
        onClose: { type: Function, required: true },
        isShowNotification: { type: Boolean, required: true },
        type: { type: String, required: true, validator: function(value) {
            const expectation = [
                'success', 'info', 'warning', 'danger', 'failed'
            ];
            return expectation.indexOf(value) > -1;
        }},
    },

    data() {
        return {
//            modalHeight: '',
            modalHeightWhenSlideOpened: '160px',
            isLoading: false,
        }
    },

    methods: {
        close: function() {
            this.onClose();
            setTimeout(() => {
                this.showDeleteConfirm = false;
            }, 1000);
        },

        setModalHeight: function() {
            const el = document.getElementById('notification-modal');
            if(!el) return;
            el.style.height = el.clientHeight + 'px';
        }
    },

    watch: {
        isActive: function() {
            this.$nextTick(() => {
                this.setModalHeight();
            });
        },

        isShowNotification: function() {
            const el = document.getElementById('notification-modal');
            if(!el) return;

//            this.modalHeight = el.clientHeight;
            el.style.height = this.modalHeightWhenSlideOpened;
        },
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
