<template>
<transition name="popup-menu">
    <black-screen v-show="isActive" :overlayId="overlayId">
        <div :style="box">
            <button class="modal-close" aria-label="close"
                style="position: absolute; 
                    top: -8px;
                    right: -8px;
                    background-color: rgb(84, 110, 122);
                    z-index: 999;
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
//        id:          { type: String,   required: true },
        clickX:      { type: Number,   required: true },
        clickY:      { type: Number,   required: true },
//        offsetX:     { type: Number,   default: 0 },
        offsetY:     { type: Number,   default: 0 },
        scrollX:     { type: Number,   required: false }, 
        scrollY:     { type: Number,   required: false }, 
        height:      { type: Number,   default: 320 },
        width:       { type: Number,   default: 240 },
        isActive:    { type: Boolean,  required: true },
        onClose:     { type: Function, required: true },
        overlayId:   { type: String,   default: '' }
    },

    computed: {
        xPosition: function() {
            const rightEdge = window.innerWidth + this.scrollX;

            if( (this.clickX + this.width + this.scrollX) > rightEdge ) {
                return rightEdge - this.width - 10;
            }

            return this.clickX + this.scrollX;
        },

        yPosition: function() {
            // clickY is a absolute position, but the return value(y) must be relative position
            const y = this.clickY - this.offsetY - this.height;

            const isScroll = (this.scrollY > this.offsetY);

            if( !isScroll && y < 10 ) {
                return 10;
            } 
            
            if( isScroll && y < this.scrollY - this.offsetY ) {
                return scrollY - this.offsetY + 10;
            }

            return y;
        },

        box: function() {
            return {
                position: 'absolute',
                top: this.yPosition + 'px',
                left: this.xPosition + 'px',
                'background-color': 'blue',
                height: this.height + 'px',
                width: this.width + 'px',
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
    transition: opacity .1s ease;
}
</style>
