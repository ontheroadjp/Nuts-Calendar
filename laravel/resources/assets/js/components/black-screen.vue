<template>
<!--
    <div class="black-screen" :style="`background-color: ${color}; width: ${width}px`">
        <slot></slot>
    </div>
-->
    <div class="black-screen" :style="`background-color: ${color};`" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        color:   { type: String, default: 'rgba(217, 217, 217, 0.75)' },
        onClick: { type: Function, default: () => {} }
//        overlayId: { type: String, default: '' }
    },

//    data() {
//        return {
//            width: 0
//        }
//    },

//    mounted() {
//        if( this.overlayId === '' ) return;
//
//        let target = window.document.getElementById(this.overlayId);
//
//        this.width = target.scrollWidth;
//    },


}
</script>

<style lang="scss" scoped>
    .black-screen {
        position: absolute;
        min-height: 100%;
        min-width: 100%;
        z-index: 50;
        overflow: hidden;
    }
</style>
