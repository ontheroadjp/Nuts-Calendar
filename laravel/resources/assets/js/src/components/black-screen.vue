<template>
<div class="black-screen" @click="onClick">
    <slot></slot>
</div>
</template>

<script>
import headCss from '../mixins/headCss.js';

export default {
    props: {
        bgColor: { type: String, default: 'rgba(217, 217, 217, 0.75)' },
        zIndex: { type: Number, default: 0 },
        onClick: { type: Function, default: () => {} },
        onActive: { type: Function, default: () => {} }
    },

    mixins: [ headCss ],

    data() {
        return {
            headCssId: 'black-screen-css',
            headCss: `
                .black-screen {
                    position: absolute;
                    min-height: 100%;
                    min-width: 100%;
                    z-index: ${this.zIndex};
                    overflow: hidden;
                    background-color: ${this.bgColor};
                }
            `
        }
    },

    mounted() {
        this.addCssClass(this.headCssId, this.headCss);
        this.onActive();
    },

    destroyed() {
        this.removeCssClass(this.headCssId);
    }
}
</script>
