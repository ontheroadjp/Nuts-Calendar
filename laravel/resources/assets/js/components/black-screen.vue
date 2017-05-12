<template>
    <div class="black-screen" :style="'background-color: ' + color">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'rgba(217, 217, 217, 0.75)'
        }
    }
}
</script>

<style lang="scss" scoped>
    .black-screen {
        position: absolute;
        min-height: 100%;
        min-width: 100%;
        z-index: 999;
    }
</style>
