<template>
    <transition name="notification">
        <div class="card notification"
            :style="isSuccess
                        ? 'background-color: #23d160'
                        : 'background-color: #ff3860'
            "
            v-show="isSuccess || isFailed"
        >
            <div style="
                display: flex;
                justify-content: center;
                height: 75%;
            ">
                <div style="display: flex; justify-content: space-around; align-items: center;">
                    <i v-if="isSuccess" class="fa fa-check-circle fa-3x"></i>
                    <i v-else-if="isFailed" class="fa fa-exclamation-circle fa-3x"></i>
                </div>
            </div>

            <div class="notification-buttons">
                <button class="button strip"
                    style="color:#fff"
                    @click="clickClose()"
                >OK</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isSuccess: { type: Boolean, required: true },
        isFailed:  { type: Boolean, required: true },
    },

    date() {
        return {
            showSuccessNotification: false,
            showErrorNotification: false
        }
    },

    methods: {
        clickClose() {
            this.$emit('close');
        },

    }
};
</script>

<style lang="scss" scoped>
.notification,
.delete-confirm {
    background-color: red;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.notification-buttons,
.delete-confirm-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}

.notification-enter-active,
.notification-leave-active,
.delete-confirm-enter-active,
.delete-confirm-leave-active {
    transition: all .3s ease;
}

.notification-leave-to,
.notification-enter,
.delete-confirm-leave-to,
.delete-confirm-enter {
    height: 0;
    opacity: 0;
}

.notification-enter-to,
.notification-leave,
.delete-confirm-enter-to,
.delete-confirm-leave {
    opacity: 1;
    height: 150px;
}
</style>
