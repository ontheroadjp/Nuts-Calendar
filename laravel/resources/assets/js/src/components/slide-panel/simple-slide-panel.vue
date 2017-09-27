<template>
    <transition :name="name + '-slide-panel'"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
<!--
        <div v-if="isActive"
            :class="['card', name + '-slide-panel']"
            :style="{'background-color': bgColor, height: height}"
        ><slot></slot></div>
-->
        <div v-if="isActive"
            :class="['card', name + '-slide-panel']"
            :style="{'background-color': bgColor}"
        ><slot></slot></div>
    </transition>
</template>

<script>

export default {
    props: {
        name:     { type: String, required: true },
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        bgColor:  { type: String, default: '#fff' },
        position: { type: String, default: 'bottom',
            validator: function(value) {
                return value == 'top' || value == 'bottom'
            }
        }
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
            const el = document.getElementById(this.name + '-slide-panel-css')
            if(el) return;

            const doc = window.document;
            const css = doc.createElement('style');
            const rule = document.createTextNode(`
                .${this.name}-slide-panel {
                    position: absolute;
                    ${this.position}: 0;
                    width: 100%;
                }

                .${this.name}-slide-panel {
                    margin: 5px;
                    padding: 10px;
                    width: calc(100% - 10px);
                    color: #fff;
//                    text-align: center;
//                    overflow: hidden;
                    height: ${this.height};
                    display: flex;
                    flex-flow: column nowrap;
//                    justify-content: space-between;
                    z-index: 99;
                }

                .${this.name}-slide-panel-enter-active,
                .${this.name}-slide-panel-leave-active {
                    transition: all 0.3s ease;
                }

                .${this.name}-slide-panel-leave-to,
                .${this.name}-slide-panel-enter {
                    height: 0;
                    opacity: 0;
                }
            `);

            css.id = this.name + '-slide-panel-css';
            css.type = 'text/css';
            css.appendChild(rule);
            doc.getElementsByTagName('head')[0].appendChild(css);
        },

        removeCssClass() {
            const el = document.getElementById(this.name + '-slide-panel-css');
            if(el) el.parentNode.removeChild(el);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
