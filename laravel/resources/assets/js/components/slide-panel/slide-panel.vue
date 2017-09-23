<template>
    <transition name="slide-panel">
        <slot></slot>
    </transition>
</template>

<script>
export default {
    props: {
        bgColor:  { type: String, default: '#f5f5f5' },
        height:   { type: String, default: '300px' }
    },

    mounted: function() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
//            .slide-panel-content {
//                background-color: ${this.bgColor};
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

            .slide-panel-enter-to,
            .slide-panel-leave {
                opacity: 1;
                height: ${this.height};
            }

            .slide-panel-enter-active,
            .slide-panel-leave-active {
                transition: all .3s ease;
            }

            .slide-panel-leave-to,
            .slide-panel-enter {
                height: 0;
                opacity: 0;
            }
        `);

        css.id = 'slide-panel';
        css.type = 'text/css';
        css.appendChild(rule);
        doc.getElementsByTagName('head')[0].appendChild(css);
    }
};
</script>
