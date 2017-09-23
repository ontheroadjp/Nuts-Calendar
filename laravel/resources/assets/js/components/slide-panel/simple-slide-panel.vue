<template>
<div :class="name + '-simple-slide-panel'">
    <slide-panel v-if="isActive" :height="height"
        @before-enter="addCssClass"
        @before-leave="addCssClass"
    >
        <div :class="['card', name + '-simple-slide-panel-content']"
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
        name:     { type: String, required: true },
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        bgColor:  { type: String, default: '#fff' },
        position: { type: String, default: 'bottom', validator: function(value) {
            return value == 'top' || value == 'bottom'
        }}
    },

    methods: {
        afterLeave: function() {
            u.clog('fire @after-leave');
            this.$emit('after-leave');
            this.removeCssClass();
        },

        addCssClass: function() {
            const el = document.getElementById(this.name + '-simple-slide-panel-css')
            if(el) return;

            const doc = window.document;
            const css = doc.createElement('style');
            const rule = document.createTextNode(`
                .${this.name}-simple-slide-panel {
                    position: absolute;
                    ${this.position}: 0;
                    width: 100%;
                }

                .${this.name}-simple-slide-panel-content {
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

            css.id = this.name + '-simple-slide-panel-css';
            css.type = 'text/css';
            css.appendChild(rule);
            doc.getElementsByTagName('head')[0].appendChild(css);
        }
    }
};
</script>
