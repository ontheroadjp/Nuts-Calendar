<template>
<transition name="popup-menu">
    <div v-show="isActive" :style="box">
        <button class="modal-close" aria-label="close"
            style="position: absolute; 
                top: -8px;
                right: -8px;
                background-color: rgb(84, 110, 122);
                z-index: 5;
            "
            @click.stop="onClose"
        ></button>

        <slot></slot>
    </div>
</transition>
</template>

<script>

export default {

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
            // clickY is absolute position toward the window, 
            // but the y:return-value must be relative position against a component.
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
    opacity: 1;
}

.popup-menu-enter-active,
.popup-menu-leave-active {
    transition: all .1s ease;
}
</style>
