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
        bgColor:  { type: String, default: '#fff' },
        position: { type: String, default: 'top', validator: function(value) {
            return value == 'top' || value == 'bottom'
        }}
    },

    mounted: function() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
            .simple-slide-panel {
                position: absolute;
                ${this.position}: 0;
                width: 100%;
            }

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
