<template>
    <transition :name="name + '-slide-panel'"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
        <div v-if="isActive"
            :class="['card', name + '-slide-panel']"
            :style="{'background-color': bgColor}"
        ><slot></slot></div>
    </transition>
</template>

<script>
import headCss from '../../mixins/headCss.js';

export default {
    mixins: [ headCss ],

    props: {
        name: { type: String, required: true },
        height: { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        bgColor: { type: String, default: '#fff' },
        position: { type: String, default: 'bottom',
            validator: function(value) {
                return value == 'top' || value == 'bottom'
            }
        }
    },

    data() {
        return {
            headCssId: this.name + '-slide-panel-css',
            headCss:`
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
                    height: ${this.height};
                    display: flex;
                    flex-flow: column nowrap;
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
            `
        }
    },

    methods: {
        beforeEnter: function() {
            this.addCssClass(this.headCssId, this.headCss);
            this.$emit('before-enter');
        },

        afterEnter: function() {
            this.$emit('after-enter');
        },

        beforeLeave: function() {
            this.addCssClass(this.headCssId, this.headCss);
            this.$emit('before-leave');
        },

        afterLeave: function() {
            this.$emit('after-leave');
            this.removeCssClass(this.headCssId);
        }
    }
};
</script>
