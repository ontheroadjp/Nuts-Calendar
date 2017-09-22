<template>
    <transition name="notification">
        <div class="card notification"
            :style="isSuccessActive
                        ? 'background-color: #23d160'
                        : 'background-color: #ff3860'
            "
            v-show="isSuccessActive || isFailedActive"
        >
            <div style="
                display: flex;
                justify-content: center;
                height: 75%;
            ">
                <div style="display: flex; justify-content: space-around; align-items: center;">
                    <i v-if="isSuccessActive" class="fa fa-check-circle fa-3x"></i>
                    <i v-else-if="isFailedActive" class="fa fa-exclamation-circle fa-3x"></i>
                </div>
                <div v-text="isSuccessActive ? 'Success' : 'Failed'"
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
        isSuccessActive: { type: Boolean, required: true },
        isFailedActive:  { type: Boolean, required: true },
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
.notification {
    background-color: red;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    z-index: 99;
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
    height: 150px;
}
</style>
