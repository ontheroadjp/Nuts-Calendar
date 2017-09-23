<template>
<div class="simple-slide-panel">
    <slide-panel v-if="isActive" :bgColor="bgColor" :height="height">
        <div class="card slide-panel-content">
            <slot></slot>
        </div>
    </slide-panel>
</div>
</template>

<script>
import slidePanel from '../slide-panel/slide-panel.vue';
//import icon from './notification-icon.vue';

export default {
//    components: { slidePanel, icon },
    components: { slidePanel },

    props: {
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        bgColor:  { type: String, default: '#fff' }
    },

//    computed: {
//        bgColor: function() {
//            switch(this.type) {
//                case "success": return '#23d160'; break;
//                case "info":    return '#3273dc'; break;
//                case "warning": return '#ffdd57'; break;
//                case "danger":  return '#ff3860'; break;
//                case "failed":  return '#ff3860'; break;
//            }
//        },
//
//        defaultMessage: function() {
//            return this.type.toUpperCase();
//        }
//    },

//    methods: {
//        clickClose() {
//            this.$emit('close');
//        }
//    },

    mounted: function() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
            .slide-panel-content {
                background-color: ${this.bgColor};
                margin: 5px;
                padding: 10px;
                color: #fff;
                text-align: center;
                overflow: hidden;
                height: ${this.height};
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-between;
                z-index: 99;
            }
        `);

        css.id = 'slide-panel';
        css.type = 'text/css';
        css.appendChild(rule);
        doc.getElementsByTagName('head')[0].appendChild(css);
    }
};
</script>

<style lang="scss" scoped>
.simple-slide-panel {
    position: absolute;
    top: 0;
    width: 100%;
}
/*
.panel-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75%;
}

.buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}
*/
</style>
