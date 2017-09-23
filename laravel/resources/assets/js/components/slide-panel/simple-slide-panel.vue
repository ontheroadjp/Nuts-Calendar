<template>
<div class="simple-slide-panel">
    <slide-panel v-if="isActive" :height="height">
        <div class="card slide-panel-content"
             :style="'background-color: ' + bgColor"
        ><slot></slot></div>
    </slide-panel>
</div>
</template>

<script>
import slidePanel from '../slide-panel/slide-panel.vue';

export default {
    components: { slidePanel },

    props: {
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        bgColor:  { type: String, default: '#fff' }
    },

    mounted: function() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
            .slide-panel-content {
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
</style>
