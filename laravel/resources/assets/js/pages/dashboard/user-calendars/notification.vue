<template>
<slide-panel v-if="isActive" :bgColor="bgColor" :height="height">
    <div style="display: flex; justify-content: center; align-items: center; height: 75%;">
        <i v-if="type === 'success'" class="fa fa-check-circle fa-3x"></i>
        <i v-else-if="type === 'danger'" class="fa fa-exclamation-circle fa-3x"></i>
        <div style="padding-left: 10px;" v-text="message ? message : defaultMessage"></div>
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
        type:     { type: String, required: true, validator: function(value) {
                         const expectation = [
                             'success', 'info', 'warning', 'danger'
                         ];
                         return expectation.indexOf(value) > -1;
                  }},
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        message:  { type: String, required: false }
    },

    computed: {
        bgColor: function() {
            switch(this.type) {
                case "success": return '#23d160'; break;
                case "info":    return '#3273dc'; break;
                case "warning": return '#ffdd57'; break;
                case "danger":  return '#ff3860'; break;
            }
        },

        defaultMessage: function() {
            return this.type.toUpperCase();
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
