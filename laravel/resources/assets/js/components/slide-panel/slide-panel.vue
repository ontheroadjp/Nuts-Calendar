<template>
    <transition name="slide-panel">
        <slot></slot>
    </transition>
</template>

<script>
export default {
    props: {
        height:   { type: String, default: '300px' },
        duration: { type: String, default: '.3s' }
    },

    mounted: function() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
            .slide-panel-enter-to,
            .slide-panel-leave {
                opacity: 1;
                height: ${this.height};
            }

            .slide-panel-enter-active,
            .slide-panel-leave-active {
                transition: all ${duration} ease;
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
