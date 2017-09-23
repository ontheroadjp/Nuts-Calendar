<template>
    <transition name="delete-confirm">
        <div class="card delete-confirm"
            v-show="isActive"
        >
            <div style="
                display: flex;
                justify-content: center;
                height: 75%;
            ">
                <div style="display: flex; justify-content: space-around; align-items: center;">
                    <i v-if="!isLoading" class="fa fa-exclamation-circle fa-3x"></i>
                    <i v-else class="fa fa-refresh fa-spin fa-3x"></i>
                    <span v-show="!isLoading"
                        class="thin-200"
                        style="padding: 20px; font-size: 1.8rem;"
                    >{{ message }}</span>
                </div>
            </div>

            <div v-show="!isLoading" class="delete-confirm-buttons">
                <button class="button strip"
                    style="color:#fff"
                    @click="clickCancel()"
                    :disabled="isLoading"
                >Cancel</button>

                <button class="button strip"
                    style="color:#fff"
                    @click="clickOK()"
                >OK</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isActive:  { type: Boolean, required: true },
        isLoading: { type: Boolean, default: false },
        message:   { type: String, default: 'Are you sure ?' }
    },

    methods: {
        clickCancel() {
            this.$emit('cancel');
        },

        clickOK() {
            this.$emit('ok');
        }
    }
};
</script>

<style lang="scss" scoped>
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

.delete-confirm-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}

.delete-confirm-enter-active,
.delete-confirm-leave-active {
    transition: all .3s ease;
}

.delete-confirm-leave-to,
.delete-confirm-enter {
    height: 0;
    opacity: 0;
}

.delete-confirm-enter-to,
.delete-confirm-leave {
    opacity: 1;
    height: 150px;
}
</style>
