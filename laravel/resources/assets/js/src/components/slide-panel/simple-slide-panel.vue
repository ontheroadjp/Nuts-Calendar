<template>
    <!-- <div :class="name + '-simple-slide-panel'"> -->
    <!-- <transition :name="name + '-simple-slide-panel'" v-if="isActive" :height="height" -->
    <transition :name="name + '-simple-slide-panel'"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
        <div v-if="isActive"
            :class="['card', name + '-simple-slide-panel']"
            :style="{'background-color': bgColor, height: height}"
        ><slot></slot></div>
    </transition>
    <!-- </div> -->
</template>

<script>
//import slidePanel from '../slide-panel/slide-panel.vue';

export default {
//    components: { slidePanel },

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
        beforeEnter: function() {
            this.addCssClass();
            this.$emit('before-enter');
        },

        afterEnter: function() {
            this.$emit('after-enter');
        },

        beforeLeave: function() {
            this.addCssClass();
            this.$emit('before-leave');
        },

        afterLeave: function() {
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

                .${this.name}-simple-slide-panel {
                    margin: 5px;
                    padding: 10px;
                    width: calc(100% - 10px);
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
        },

        removeCssClass() {
            const el = document.getElementById(this.name + '-simple-slide-panel-css');
            if(el) el.parentNode.removeChild(el);
        }
    }
};
</script>
