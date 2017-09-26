<template>
    <transition name="slide-panel"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
export default {
    props: {
        height:   { type: String, default: '300px' },
        duration: { type: String, default: '.3s' }
    },

    methods: {
        beforeEnter: function() {
//            u.clog('fire @before-enter');
            this.$emit('before-enter');
            this.addCssClass();
        },

        afterEnter: function() {
//            u.clog('fire @after-enter');
            this.$emit('after-enter');
            this.removeCssClass();
        },

        beforeLeave: function() {
//            u.clog('fire @before-leave');
            this.$emit('before-leave');
            this.addCssClass();
        },

        afterLeave: function() {
//            u.clog('fire @after-leave');
            this.$emit('after-leave');
            this.removeCssClass();
        },

        addCssClass() {
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
                    transition: all ${this.duration} ease;
                }

                .slide-panel-leave-to,
                .slide-panel-enter {
                    height: 0;
                    opacity: 0;
                }
            `);

            css.id = 'slide-panel-css';
            css.type = 'text/css';
            css.appendChild(rule);
            doc.getElementsByTagName('head')[0].appendChild(css);
        },

        removeCssClass() {
            const el = document.getElementById('slide-panel-css')
            if(el) el.parentNode.removeChild(el);
        }
    }

};
</script>
