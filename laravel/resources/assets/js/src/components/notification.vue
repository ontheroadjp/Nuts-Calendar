<template>
    <transition name="notification-slide-in">
        <div
            v-show="notification.isActive"
            :class="['notification', notification.type]"
            style="position: fixed; top: 60px; right: 0; margin-right: 10px; z-index: 99;"
            >
            <button
                v-show="notification.isImportant"
                class="delete"
                @click="$store.commit('RESET_NOTIFICATION')"
                >
            </button>
            <span class="icon">
                <i v-show="notification.type === ''" class="fa fa-info-circle"></i>
                <i v-show="notification.type === 'is-primary'" class="fa fa-check-circle"></i>
                <i v-show="notification.type === 'is-info'" class="fa fa-info-circle"></i>
                <i v-show="notification.type === 'is-success'" class="fa fa-check-circle"></i>
                <i v-show="notification.type === 'is-warning'" class="fa fa-exclamation-circle"></i>
                <i v-show="notification.type === 'is-danger'" class="fa fa-exclamation-triangle"></i>
            </span>
            {{ notification.content }}
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import { RESET_NOTIFICATION } from '../store/mutation-types.js';

export default {
    computed: {
        ...mapState({
            notification: state => state.app.message.notification
        })
    },

    watch: {
        'notification.isActive': function(newVal) {
            if(newVal && !this.notification.isImportant) {
                setTimeout( () => {
                    this.$store.commit(RESET_NOTIFICATION)
                }, this.$store.state.app.message.notification.autoClose);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .notification-slide-in-enter-active,
    .notification-slide-in-leave-active {
        transition: all 0.1s linear;
    }

    .notification-slide-in-enter,
    .notification-slide-in-leave-to {
        transform: translateX(100px);
    }
</style>
