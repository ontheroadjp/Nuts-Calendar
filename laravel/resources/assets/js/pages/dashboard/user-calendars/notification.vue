<template>
<slide-panel v-if="isSuccessActive || isFailedActive" :bgColor="bgColor" :height="height">
    <div style="display: flex; justify-content: center; height: 75%;">
        <div style="display: flex; justify-content: space-around; align-items: center;">
            <i v-if="isSuccessActive" class="fa fa-check-circle fa-3x"></i>
            <i v-else-if="isFailedActive" class="fa fa-exclamation-circle fa-3x"></i>
        </div>
        <div v-text="isSuccessActive ? 'Success' : 'Failed'"></div>
    </div>

    <div class="notification-buttons">
        <button class="button strip"
            style="color:#fff"
            @click="clickClose()"
        >OK</button>
    </div>
</slide-panel>
</template>

<script>
import slidePanel from '../../../components/slide-panel.vue';

export default {
    components: { slidePanel },

    props: {
        isSuccessActive: { type: Boolean, default: false },
        isFailedActive:  { type: Boolean, default: false },
        height:          { type: String, default: '300px' }
    },

    computed: {
        bgColor: function() {
            return this.isSuccessActive ? '#23d160' : '#ff3860';
        }
    },

    methods: {
        clickClose() {
            this.$emit('close');
        }
    },

//    mounted: function() {
//        const doc = window.document;
//        const css = doc.createElement('style');
//        const rule = document.createTextNode(`
//            .notification {
//                background-color: red;
//                padding: 10px;
//                color: #fff;
//                text-align: center;
//                overflow: hidden;
//                height: ${this.height};
//                display: flex;
//                flex-flow: column nowrap;
//                justify-content: space-between;
//                z-index: 99;
//            }
//
//            .notification-enter-to,
//            .notification-leave {
//                opacity: 1;
//                height: ${this.height};
//            }
//        `);
//
//        css.id = 'delete-confirm';
//        css.type = 'text/css';
//        css.appendChild(rule);
//        doc.getElementsByTagName('head')[0].appendChild(css);
//    }
};
</script>

<style lang="scss" scoped>
.notification-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}
/*
.notification-enter-active,
.notification-leave-active {
    transition: all .3s ease;
}

.notification-leave-to,
.notification-enter {
    height: 0;
    opacity: 0;
}
*/
</style>
