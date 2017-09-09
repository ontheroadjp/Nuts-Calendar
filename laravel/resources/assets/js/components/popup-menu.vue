<template>
<transition name="popup-menu">
    <black-screen v-show="isActive">
        <div :style="box">
            <button class="modal-close is-large" aria-label="close"
                style="position: absolute; 
                        top: 20px;
                        right: 20px;
                        background-color: rgba(84, 110, 122, 0.5);
                "
                @click.stop="onClose()"
            ></button>

            <slot></slot>
        </div>
    </black-screen>
</transition>
</template>

<script>
import blackScreen from './black-screen.vue';

export default {
    components: {
        blackScreen
    },

    props: {
//        id:       { type: String,  required: true },
        x:        { type: Number, required: true },
        y:        { type: Number, required: true },
        height:   { type: Number,  default: 320 },
        width:    { type: Number,  default: 240 },
        isActive: { type: Boolean, required: true },
        onClose:  { type: Function, required: true }
    },

    computed: {
        xPosition: function() {
            const clickPoint = (this.x - 20);
            if((clickPoint + this.width)> window.innerWidth) {
                return window.innerWidth - this.width - 50;
            }
            
            return clickPoint;
        },

        yPosition: function() {
            const clickPoint = (this.y - 62 - this.height);
            if(clickPoint < 0) {
                return 10;
            }
            
            return clickPoint;
        },

        box: function() {
            return {
                position: 'absolute',
                top: this.yPosition + 'px',
                left: this.xPosition + 'px',
                'background-color': 'blue',
                height: '320px',
                width: '240px',
                color: '#fff',
                'z-index': 999
            }
        }
    },

    methods: {
        close() {
            this.$emit('update:isActive', false);
        }
    }
} 
</script>

<style>
.popup-menu-enter,
.popup-menu-leave-to {
    opacity: 0;    
}

.popup-menu-enter-to,
.popup-menu-leave {
    opacity: 1
}

.popup-menu-enter-active,
.popup-menu-leave-active {
    transition: all 0.3s ease;
}
</style>
